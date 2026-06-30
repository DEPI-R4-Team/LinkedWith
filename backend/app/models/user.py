from datetime import datetime
from decimal import Decimal

from sqlalchemy import Boolean, DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="active", server_default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    student_profile: Mapped["StudentProfile | None"] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
    )
    instructor_profile: Mapped["InstructorProfile | None"] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
    )
    learning_requests = relationship(
        "LearningRequest",
        foreign_keys="LearningRequest.student_id",
        back_populates="student",
        cascade="all, delete-orphan",
    )
    applications = relationship("Application", back_populates="instructor", cascade="all, delete-orphan")
    student_sessions = relationship("Session", foreign_keys="Session.student_id", back_populates="student")
    instructor_sessions = relationship("Session", foreign_keys="Session.instructor_id", back_populates="instructor")
    student_payments = relationship("Payment", foreign_keys="Payment.student_id", back_populates="student")
    instructor_payments = relationship("Payment", foreign_keys="Payment.instructor_id", back_populates="instructor")
    instructor_wallet = relationship("InstructorWallet", back_populates="instructor", cascade="all, delete-orphan", uselist=False)
    wallet_transactions = relationship("WalletTransaction", back_populates="instructor", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="sender", cascade="all, delete-orphan")
    student_reviews = relationship("Review", foreign_keys="Review.student_id", back_populates="student", cascade="all, delete-orphan")
    instructor_reviews = relationship("Review", foreign_keys="Review.instructor_id", back_populates="instructor", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    group_participations = relationship("GroupParticipant", back_populates="student", cascade="all, delete-orphan")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String(32))
    education_level: Mapped[str | None] = mapped_column(String(120))
    bio: Mapped[str | None] = mapped_column(Text)
    profile_image: Mapped[str | None] = mapped_column(String(500))
    university: Mapped[str | None] = mapped_column(String(160))
    department: Mapped[str | None] = mapped_column(String(160))
    preferred_language: Mapped[str | None] = mapped_column(String(80))
    location: Mapped[str | None] = mapped_column(String(160))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped[User] = relationship(back_populates="student_profile")


class InstructorProfile(Base):
    __tablename__ = "instructor_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String(32))
    specialization: Mapped[str | None] = mapped_column(String(160))
    skills: Mapped[str | None] = mapped_column(Text)
    experience: Mapped[str | None] = mapped_column(Text)
    bio: Mapped[str | None] = mapped_column(Text)
    price_per_session: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    rating: Mapped[Decimal] = mapped_column(Numeric(3, 2), nullable=False, default=Decimal("0.00"), server_default="0")
    verification_status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="pending_verification",
        server_default="pending_verification",
    )
    is_available_for_instant: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, server_default="false")
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    profile_image: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped[User] = relationship(back_populates="instructor_profile")
