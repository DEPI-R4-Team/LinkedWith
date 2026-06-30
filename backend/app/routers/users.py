from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models import InstructorProfile, Review, Session as LearningSession, User
from app.schemas.user_schema import CurrentUserResponse, InstructorDetailResponse, InstructorListItemResponse, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/ping")
def ping() -> dict[str, str]:
    return {"router": "users", "status": "ok"}


@router.get("/me", response_model=CurrentUserResponse)
def get_my_user(current_user: User = Depends(get_current_user)) -> User:
    return current_user


def serialize_instructor(user: User) -> InstructorListItemResponse:
    profile = user.instructor_profile
    return InstructorListItemResponse(
        id=user.id,
        full_name=user.full_name,
        specialization=profile.specialization if profile else None,
        skills=profile.skills if profile else None,
        experience=profile.experience if profile else None,
        bio=profile.bio if profile else None,
        price_per_session=profile.price_per_session if profile else None,
        rating=profile.rating if profile else 0,
        verification_status=profile.verification_status if profile else "pending_verification",
        is_available_for_instant=profile.is_available_for_instant if profile else False,
        profile_image=profile.profile_image if profile else None,
        created_at=user.created_at,
    )


@router.get("/instructors", response_model=list[InstructorListItemResponse])
def list_instructors(
    search: str | None = Query(default=None, max_length=120),
    specialization: str | None = Query(default=None, max_length=160),
    min_rating: float | None = Query(default=None, ge=0, le=5),
    max_price: float | None = Query(default=None, ge=0),
    availability: bool | None = None,
    verified_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[InstructorListItemResponse]:
    statement = (
        select(User)
        .outerjoin(InstructorProfile, InstructorProfile.user_id == User.id)
        .where(User.role == "instructor", User.status != "suspended")
        .options(selectinload(User.instructor_profile))
    )

    if verified_only:
        statement = statement.where(InstructorProfile.verification_status == "verified")

    if search:
        term = f"%{search.strip()}%"
        statement = statement.where(
            or_(
                User.full_name.ilike(term),
                InstructorProfile.specialization.ilike(term),
                InstructorProfile.skills.ilike(term),
                InstructorProfile.bio.ilike(term),
            )
        )

    if specialization:
        statement = statement.where(InstructorProfile.specialization.ilike(f"%{specialization.strip()}%"))

    if min_rating is not None:
        statement = statement.where(InstructorProfile.rating >= min_rating)

    if max_price is not None:
        statement = statement.where(InstructorProfile.price_per_session <= max_price)

    if availability is not None:
        statement = statement.where(InstructorProfile.is_available_for_instant == availability)

    instructors = db.scalars(
        statement.order_by(InstructorProfile.rating.desc().nullslast(), User.created_at.desc())
    ).all()
    return [serialize_instructor(instructor) for instructor in instructors]


@router.get("/instructors/{instructor_id}", response_model=InstructorDetailResponse)
def get_instructor_profile(
    instructor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InstructorDetailResponse:
    instructor = db.scalar(
        select(User)
        .where(User.id == instructor_id, User.role == "instructor", User.status != "suspended")
        .options(selectinload(User.instructor_profile))
    )
    if instructor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instructor not found.")

    base = serialize_instructor(instructor)
    total_reviews = db.scalar(
        select(func.count(Review.id)).where(Review.instructor_id == instructor.id, Review.status == "visible")
    )
    completed_sessions_count = db.scalar(
        select(func.count(LearningSession.id)).where(
            LearningSession.instructor_id == instructor.id,
            LearningSession.status == "completed",
        )
    )

    return InstructorDetailResponse(
        **base.model_dump(),
        total_reviews=total_reviews or 0,
        completed_sessions_count=completed_sessions_count or 0,
    )


@router.put("/me", response_model=CurrentUserResponse)
def update_my_user(
    payload: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    if payload.full_name is not None:
        current_user.full_name = payload.full_name

    profile = current_user.student_profile if current_user.role == "student" else current_user.instructor_profile
    if profile is not None:
        if payload.phone is not None:
            profile.phone = payload.phone
        if payload.bio is not None:
            profile.bio = payload.bio

    db.commit()
    db.refresh(current_user)
    return current_user
