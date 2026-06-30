from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReviewCreate(BaseModel):
    session_id: int
    rating: int = Field(ge=1, le=5)
    comment: str | None = None


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    student_id: int
    instructor_id: int
    rating: int
    comment: str | None = None
    status: str
    created_at: datetime
    updated_at: datetime
    student_name: str | None = None
    instructor_name: str | None = None
    session_title: str | None = None
