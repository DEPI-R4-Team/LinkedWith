from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Message(Base):
    __tablename__ = "messages"
    __table_args__ = (
        CheckConstraint(
            "(session_id IS NOT NULL AND application_id IS NULL) OR "
            "(session_id IS NULL AND application_id IS NOT NULL)",
            name="ck_messages_single_chat_context",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    session_id: Mapped[int | None] = mapped_column(ForeignKey("sessions.id", ondelete="CASCADE"), index=True)
    application_id: Mapped[int | None] = mapped_column(ForeignKey("applications.id", ondelete="CASCADE"), index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    session = relationship("Session", back_populates="messages")
    application = relationship("Application", back_populates="messages")
    sender = relationship("User", back_populates="messages")
