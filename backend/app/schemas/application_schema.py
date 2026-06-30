from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.session_schema import SessionResponse

ApplicationStatus = Literal["pending", "accepted", "rejected"]


class ApplicationCreate(BaseModel):
    request_id: int
    message: str = Field(min_length=1, max_length=2000)
    proposed_price: Decimal = Field(gt=0)


class ApplicationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    request_id: int
    instructor_id: int
    message: str
    proposed_price: Decimal
    status: ApplicationStatus
    created_at: datetime
    updated_at: datetime
    instructor_name: str | None = None
    instructor_specialization: str | None = None
    instructor_rating: Decimal | None = None
    request_title: str | None = None
    student_name: str | None = None


class ApplicationDecisionResponse(BaseModel):
    application: ApplicationResponse
    session: SessionResponse | None = None
