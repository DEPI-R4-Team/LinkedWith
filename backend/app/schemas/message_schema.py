from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MessageCreate(BaseModel):
    session_id: int | None = None
    application_id: int | None = None
    message: str = Field(min_length=1)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int | None = None
    application_id: int | None = None
    sender_id: int
    sender_name: str | None = None
    sender_role: str | None = None
    message: str
    created_at: datetime


class ChatConversationResponse(BaseModel):
    conversation_type: str
    application_id: int | None = None
    session_id: int | None = None
    request_id: int
    request_title: str
    request_type: str
    status: str
    other_user_id: int
    other_user_name: str
    label: str
    last_message: str | None = None
    last_message_at: datetime | None = None
    created_at: datetime
