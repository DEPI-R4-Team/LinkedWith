from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user, require_roles
from app.models import InstructorProfile, LearningRequest, Session as LearningSession, User
from app.schemas.instant_request_schema import (
    InstantAcceptResponse,
    InstantAvailabilityResponse,
    InstantAvailabilityUpdate,
    InstantRequestCreate,
    InstantRequestResponse,
)
from app.schemas.session_schema import SessionResponse
from app.services.instant_request_service import (
    INSTANT_OPEN_STATUS,
    accept_instant_request,
    cancel_instant_request,
    create_instant_request,
    expire_old_instant_requests,
    is_instant_request_expired,
)

router = APIRouter(prefix="/instant-requests", tags=["instant requests"])


def to_session_response(session: LearningSession) -> SessionResponse:
    return SessionResponse.model_validate(session).model_copy(
        update={
            "request_title": session.request.title if session.request else None,
            "request_status": session.request.status if session.request else None,
            "student_name": session.student.full_name if session.student else None,
            "instructor_name": session.instructor.full_name if session.instructor else None,
            "has_review": bool(session.reviews),
        }
    )


def to_instant_response(request: LearningRequest) -> InstantRequestResponse:
    session = request.sessions[0] if request.sessions else None
    return InstantRequestResponse(
        id=request.id,
        title=request.title,
        subject=request.subject,
        description=request.description,
        student_id=request.student_id,
        student_name=request.student.full_name if request.student else None,
        request_type=request.request_type,
        status=request.status,
        budget=request.final_price_per_student or request.base_price,
        skill_level=request.level,
        session_mode=request.session_mode,
        session_type=request.session_type,
        urgency_level=request.urgency_level,
        expires_at=request.expires_at,
        accepted_instructor_id=request.accepted_instructor_id,
        accepted_instructor_name=request.accepted_instructor.full_name if request.accepted_instructor else None,
        accepted_at=request.accepted_at,
        session_id=session.id if session else None,
        created_at=request.created_at,
        updated_at=request.updated_at,
    )


def instant_options():
    return (
        selectinload(LearningRequest.student),
        selectinload(LearningRequest.accepted_instructor),
        selectinload(LearningRequest.sessions).selectinload(LearningSession.student),
        selectinload(LearningRequest.sessions).selectinload(LearningSession.instructor),
        selectinload(LearningRequest.sessions).selectinload(LearningSession.request),
        selectinload(LearningRequest.sessions).selectinload(LearningSession.reviews),
    )


def get_instant_request_or_404(db: Session, request_id: int) -> LearningRequest:
    request = db.scalar(
        select(LearningRequest)
        .where(LearningRequest.id == request_id, LearningRequest.request_type == "instant")
        .options(*instant_options())
    )
    if request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instant request not found.")
    return request


@router.post("", response_model=InstantRequestResponse, status_code=status.HTTP_201_CREATED)
def create_instant_request_endpoint(
    payload: InstantRequestCreate,
    current_user: User = Depends(require_roles(["student"])),
    db: Session = Depends(get_db),
) -> InstantRequestResponse:
    request = create_instant_request(db, current_user, payload)
    db.commit()
    return to_instant_response(get_instant_request_or_404(db, request.id))


@router.get("", response_model=list[InstantRequestResponse])
def list_open_instant_requests(
    current_user: User = Depends(require_roles(["instructor"])),
    db: Session = Depends(get_db),
) -> list[InstantRequestResponse]:
    expired_count = expire_old_instant_requests(db)
    if expired_count:
        db.commit()

    if current_user.instructor_profile is None or not current_user.instructor_profile.is_available_for_instant:
        return []

    requests = db.scalars(
        select(LearningRequest)
        .where(
            LearningRequest.request_type == "instant",
            LearningRequest.status == INSTANT_OPEN_STATUS,
        )
        .order_by(LearningRequest.expires_at.asc(), LearningRequest.created_at.desc())
        .options(*instant_options())
    ).all()
    return [to_instant_response(request) for request in requests if not is_instant_request_expired(request)]


@router.get("/my", response_model=list[InstantRequestResponse])
def get_my_instant_requests(
    current_user: User = Depends(require_roles(["student"])),
    db: Session = Depends(get_db),
) -> list[InstantRequestResponse]:
    expired_count = expire_old_instant_requests(db)
    if expired_count:
        db.commit()

    requests = db.scalars(
        select(LearningRequest)
        .where(LearningRequest.request_type == "instant", LearningRequest.student_id == current_user.id)
        .order_by(LearningRequest.created_at.desc())
        .options(*instant_options())
    ).all()
    return [to_instant_response(request) for request in requests]


@router.put("/availability", response_model=InstantAvailabilityResponse)
def update_instant_availability(
    payload: InstantAvailabilityUpdate,
    current_user: User = Depends(require_roles(["instructor"])),
    db: Session = Depends(get_db),
) -> InstantAvailabilityResponse:
    profile = current_user.instructor_profile
    if profile is None:
        profile = InstructorProfile(user_id=current_user.id)
        db.add(profile)
        db.flush()
    profile.is_available_for_instant = payload.is_available_for_instant
    db.commit()
    return InstantAvailabilityResponse(is_available_for_instant=profile.is_available_for_instant)


@router.get("/{request_id}", response_model=InstantRequestResponse)
def get_instant_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InstantRequestResponse:
    request = get_instant_request_or_404(db, request_id)
    can_view = (
        current_user.role == "admin"
        or request.student_id == current_user.id
        or request.accepted_instructor_id == current_user.id
        or (
            current_user.role == "instructor"
            and current_user.instructor_profile is not None
            and current_user.instructor_profile.is_available_for_instant
            and request.status == INSTANT_OPEN_STATUS
            and not is_instant_request_expired(request)
        )
    )
    if not can_view:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You cannot view this instant request.")
    return to_instant_response(request)


@router.post("/{request_id}/accept", response_model=InstantAcceptResponse)
def accept_instant_request_endpoint(
    request_id: int,
    current_user: User = Depends(require_roles(["instructor"])),
    db: Session = Depends(get_db),
) -> InstantAcceptResponse:
    request, session = accept_instant_request(db, request_id, current_user)
    db.commit()
    request = get_instant_request_or_404(db, request.id)
    session = db.scalar(
        select(LearningSession)
        .where(LearningSession.id == session.id)
        .options(
            selectinload(LearningSession.request),
            selectinload(LearningSession.student),
            selectinload(LearningSession.instructor),
            selectinload(LearningSession.reviews),
        )
    )
    if session is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Session was not created.")
    return InstantAcceptResponse(request=to_instant_response(request), session=to_session_response(session))


@router.post("/{request_id}/cancel", response_model=InstantRequestResponse)
def cancel_instant_request_endpoint(
    request_id: int,
    current_user: User = Depends(require_roles(["student"])),
    db: Session = Depends(get_db),
) -> InstantRequestResponse:
    request = get_instant_request_or_404(db, request_id)
    if request.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only cancel your own instant requests.")

    cancel_instant_request(db, request)
    db.commit()
    return to_instant_response(get_instant_request_or_404(db, request.id))
