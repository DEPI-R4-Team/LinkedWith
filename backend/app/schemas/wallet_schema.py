from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict

TransactionType = Literal["hold", "release", "refund", "withdraw"]


class InstructorWalletResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    instructor_id: int
    pending_balance: Decimal
    available_balance: Decimal
    total_earned: Decimal
    updated_at: datetime
    instructor_name: str | None = None


class WalletTransactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    instructor_id: int
    payment_id: int | None = None
    type: TransactionType
    amount: Decimal
    status: str
    created_at: datetime
    updated_at: datetime
