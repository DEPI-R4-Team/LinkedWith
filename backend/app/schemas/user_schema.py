from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


UserRole = Literal["student", "instructor", "admin"]
PublicRegisterRole = Literal["student", "instructor"]
UserStatus = Literal["active", "suspended", "pending"]
InstructorVerificationStatus = Literal["pending_verification", "verified", "rejected", "suspended"]


class UserBase(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    role: UserRole


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=72)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class StudentProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    phone: str | None = None
    education_level: str | None = None
    bio: str | None = None
    profile_image: str | None = None
    university: str | None = None
    department: str | None = None
    preferred_language: str | None = None
    location: str | None = None
    created_at: datetime
    updated_at: datetime


class InstructorProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    phone: str | None = None
    specialization: str | None = None
    skills: str | None = None
    experience: str | None = None
    bio: str | None = None
    price_per_session: Decimal | None = None
    rating: Decimal
    verification_status: InstructorVerificationStatus
    is_available_for_instant: bool
    last_seen_at: datetime | None = None
    profile_image: str | None = None
    created_at: datetime
    updated_at: datetime


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    status: UserStatus
    created_at: datetime
    updated_at: datetime


class CurrentUserResponse(UserResponse):
    student_profile: StudentProfileResponse | None = None
    instructor_profile: InstructorProfileResponse | None = None


class InstructorListItemResponse(BaseModel):
    id: int
    full_name: str
    specialization: str | None = None
    skills: str | None = None
    experience: str | None = None
    bio: str | None = None
    price_per_session: Decimal | None = None
    rating: Decimal
    verification_status: InstructorVerificationStatus
    is_available_for_instant: bool
    profile_image: str | None = None
    created_at: datetime


class InstructorDetailResponse(InstructorListItemResponse):
    total_reviews: int
    completed_sessions_count: int


class UserUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    phone: str | None = Field(default=None, max_length=32)
    bio: str | None = Field(default=None, max_length=2000)
