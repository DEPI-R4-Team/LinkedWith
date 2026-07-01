from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.session_schema import SessionResponse


class InstantRequestCreate(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    subject: str = Field(min_length=1, max_length=160)
    description: str = Field(min_length=1, max_length=4000)
    budget: Decimal = Field(gt=0)
    skill_level: str | None = Field(default=None, max_length=80)
    session_mode: str = Field(default="individual", max_length=32)
    session_type: str = Field(default="online", max_length=32)
    urgency_level: str | None = Field(default=None, max_length=32)
    expires_in_minutes: int = Field(default=30, ge=10, le=120)


class InstantRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    subject: str
    description: str
    student_id: int
    student_name: str | None = None
    request_type: str
    status: str
    budget: Decimal | None = None
    skill_level: str | None = None
    session_mode: str
    session_type: str
    urgency_level: str | None = None
    expires_at: datetime | None = None
    accepted_instructor_id: int | None = None
    accepted_instructor_name: str | None = None
    accepted_at: datetime | None = None
    session_id: int | None = None
    created_at: datetime
    updated_at: datetime


class InstantAcceptResponse(BaseModel):
    request: InstantRequestResponse
    session: SessionResponse


class InstantAvailabilityUpdate(BaseModel):
    is_available_for_instant: bool


class InstantAvailabilityResponse(BaseModel):
    is_available_for_instant: bool
