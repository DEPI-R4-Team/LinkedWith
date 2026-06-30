from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class LearningRequest(Base):
    __tablename__ = "requests"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    subject: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    level: Mapped[str | None] = mapped_column(String(80))
    request_type: Mapped[str] = mapped_column(String(32), nullable=False, default="normal", server_default="normal")
    session_mode: Mapped[str] = mapped_column(String(32), nullable=False, default="individual", server_default="individual")
    session_type: Mapped[str] = mapped_column(String(32), nullable=False, default="online", server_default="online")
    preferred_datetime: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    base_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    discount_per_extra_student: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    minimum_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    final_price_per_student: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    max_students: Mapped[int | None] = mapped_column()
    max_participants: Mapped[int | None] = mapped_column()
    min_participants: Mapped[int | None] = mapped_column()
    min_price_per_student: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    current_price_per_student: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    group_owner_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    group_status: Mapped[str | None] = mapped_column(String(32))
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="open", server_default="open")
    accepted_instructor_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    student = relationship("User", foreign_keys=[student_id], back_populates="learning_requests")
    accepted_instructor = relationship("User", foreign_keys=[accepted_instructor_id])
    group_owner = relationship("User", foreign_keys=[group_owner_id])
    applications = relationship("Application", back_populates="request", cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="request", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="request", cascade="all, delete-orphan")
    group_participants = relationship("GroupParticipant", back_populates="request", cascade="all, delete-orphan")
