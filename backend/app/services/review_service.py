from decimal import Decimal, ROUND_HALF_UP

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import InstructorProfile, Review


def recalculate_instructor_rating(db: Session, instructor_id: int) -> None:
    average = db.scalar(
        select(func.avg(Review.rating)).where(Review.instructor_id == instructor_id, Review.status == "visible")
    )
    profile = db.scalar(select(InstructorProfile).where(InstructorProfile.user_id == instructor_id))
    if profile is not None:
        profile.rating = Decimal(str(average or 0)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
