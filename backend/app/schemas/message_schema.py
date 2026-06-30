from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MessageCreate(BaseModel):
    session_id: int
    message: str = Field(min_length=1)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    sender_id: int
    sender_name: str | None = None
    sender_role: str | None = None
    message: str
    created_at: datetime
