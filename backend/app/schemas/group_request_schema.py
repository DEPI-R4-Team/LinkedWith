from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.application_schema import ApplicationResponse
from app.schemas.payment_schema import PaymentResponse


class GroupRequestCreate(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    subject: str = Field(min_length=1, max_length=160)
    description: str = Field(min_length=1, max_length=4000)
    level: str | None = Field(default=None, max_length=80)
    session_type: str = "online"
    preferred_datetime: datetime | None = None
    base_price: Decimal = Field(gt=0)
    min_price_per_student: Decimal = Field(gt=0)
    max_participants: int = Field(ge=2, le=50)
    min_participants: int = Field(default=2, ge=1)


class GroupParticipantResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    request_id: int
    student_id: int
    student_name: str | None = None
    status: str
    payment_status: str
    payment_id: int | None = None
    joined_at: datetime


class GroupRequestResponse(BaseModel):
    id: int
    student_id: int
    group_owner_id: int | None = None
    owner_name: str | None = None
    title: str
    subject: str
    description: str
    level: str | None = None
    request_type: str
    session_mode: str
    session_type: str
    preferred_datetime: datetime | None = None
    base_price: Decimal | None = None
    min_price_per_student: Decimal | None = None
    current_price_per_student: Decimal | None = None
    max_participants: int | None = None
    min_participants: int | None = None
    active_participants_count: int
    price_if_you_join: Decimal | None = None
    status: str
    accepted_instructor_id: int | None = None
    accepted_instructor_name: str | None = None
    session_id: int | None = None
    current_user_participant: GroupParticipantResponse | None = None
    participants: list[GroupParticipantResponse] = []
    applications: list[ApplicationResponse] = []
    created_at: datetime
    updated_at: datetime


class GroupJoinResponse(BaseModel):
    group_request: GroupRequestResponse


class GroupPricePreviewResponse(BaseModel):
    active_participants_count: int
    max_participants: int | None = None
    current_price_per_student: Decimal | None = None
    price_if_you_join: Decimal | None = None


class GroupPaymentResponse(BaseModel):
    payment: PaymentResponse
    group_request: GroupRequestResponse
