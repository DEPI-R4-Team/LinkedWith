from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict

PaymentStatus = Literal["pending", "held", "released", "refunded", "cancelled", "disputed"]
PaymentMethod = Literal["card_simulation", "wallet_simulation", "cash_simulation"]


class PaymentCreate(BaseModel):
    session_id: int
    payment_method: PaymentMethod = "card_simulation"


class SimulatePaymentRequest(BaseModel):
    payment_method: PaymentMethod = "card_simulation"


class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    request_id: int
    student_id: int
    instructor_id: int
    amount: Decimal
    platform_fee: Decimal
    total_amount: Decimal
    status: PaymentStatus
    payment_method: PaymentMethod
    paid_at: datetime | None = None
    released_at: datetime | None = None
    refunded_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
    request_title: str | None = None
    student_name: str | None = None
    instructor_name: str | None = None


class PaymentDetailResponse(PaymentResponse):
    session_status: str | None = None
    request_status: str | None = None
