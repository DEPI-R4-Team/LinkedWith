from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models import GroupParticipant, Review, Session as LearningSession, User
from app.schemas.review_schema import ReviewCreate, ReviewResponse
from app.services.notification_service import create_notification
from app.services.review_service import recalculate_instructor_rating

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("/ping")
def ping() -> dict[str, str]:
    return {"router": "reviews", "status": "ok"}


def serialize_review(review: Review) -> ReviewResponse:
    return ReviewResponse.model_validate(review).model_copy(
        update={
            "student_name": review.student.full_name if review.student else None,
            "instructor_name": review.instructor.full_name if review.instructor else None,
            "session_title": review.session.request.title if review.session and review.session.request else None,
        }
    )


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(
    payload: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ReviewResponse:
    if current_user.role != "student":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only students can create reviews.")

    session = db.scalar(
        select(LearningSession)
        .where(LearningSession.id == payload.session_id)
        .options(selectinload(LearningSession.request))
    )
    if session is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
    is_group_participant = False
    if session.request is not None and session.request.request_type == "group":
        is_group_participant = db.scalar(
            select(GroupParticipant.id).where(
                GroupParticipant.request_id == session.request_id,
                GroupParticipant.student_id == current_user.id,
                GroupParticipant.status == "active",
                GroupParticipant.payment_status.in_(["held", "released"]),
            )
        ) is not None
    if session.student_id != current_user.id and not is_group_participant:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You cannot review this session.")
    if session.status != "completed":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only completed sessions can be reviewed.")
    if session.instructor_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot review yourself.")

    duplicate = db.scalar(
        select(Review).where(Review.session_id == session.id, Review.student_id == current_user.id)
    )
    if duplicate is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already reviewed this session.")

    review = Review(
        session_id=session.id,
        student_id=current_user.id,
        instructor_id=session.instructor_id,
        rating=payload.rating,
        comment=payload.comment.strip() if payload.comment else None,
        status="visible",
    )
    db.add(review)
    db.flush()
    recalculate_instructor_rating(db, session.instructor_id)
    create_notification(
        db,
        user_id=session.instructor_id,
        type="review_received",
        title="New review received",
        message="A student left you a new review.",
        link_url="/instructor/reviews",
    )
    db.commit()

    created_review = db.scalar(
        select(Review)
        .where(Review.id == review.id)
        .options(
            selectinload(Review.student),
            selectinload(Review.instructor),
            selectinload(Review.session).selectinload(LearningSession.request),
        )
    )
    if created_review is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Review was not created.")
    return serialize_review(created_review)


@router.get("/my", response_model=list[ReviewResponse])
def get_my_reviews(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ReviewResponse]:
    if current_user.role == "student":
        clause = Review.student_id == current_user.id
    elif current_user.role == "instructor":
        clause = Review.instructor_id == current_user.id
    else:
        clause = Review.id.is_not(None)

    reviews = db.scalars(
        select(Review)
        .where(clause)
        .order_by(Review.created_at.desc())
        .options(
            selectinload(Review.student),
            selectinload(Review.instructor),
            selectinload(Review.session).selectinload(LearningSession.request),
        )
    ).all()
    return [serialize_review(review) for review in reviews]


@router.get("/instructor/{instructor_id}", response_model=list[ReviewResponse])
def get_instructor_reviews(
    instructor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ReviewResponse]:
    reviews = db.scalars(
        select(Review)
        .where(Review.instructor_id == instructor_id, Review.status == "visible")
        .order_by(Review.created_at.desc())
        .options(
            selectinload(Review.student),
            selectinload(Review.instructor),
            selectinload(Review.session).selectinload(LearningSession.request),
        )
    ).all()
    return [serialize_review(review) for review in reviews]
