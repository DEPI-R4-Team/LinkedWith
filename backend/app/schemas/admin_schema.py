from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, EmailStr


class AdminStatsResponse(BaseModel):
    total_users: int
    total_students: int
    total_instructors: int
    total_admins: int
    suspended_users: int
    total_requests: int
    open_requests: int
    waiting_payment_requests: int
    completed_requests: int
    cancelled_requests: int
    total_applications: int
    pending_applications: int
    accepted_applications: int
    rejected_applications: int
    total_sessions: int
    ready_sessions: int
    active_sessions: int
    completed_sessions: int
    cancelled_sessions: int
    total_payments: int
    held_payments: int
    released_payments: int
    refunded_payments: int
    total_reviews: int
    average_platform_rating: float
    total_wallet_pending_balance: Decimal
    total_wallet_available_balance: Decimal
    total_platform_revenue: Decimal


class AdminStudentProfileSummary(BaseModel):
    education_level: str | None = None
    phone: str | None = None


class AdminInstructorProfileSummary(BaseModel):
    specialization: str | None = None
    rating: Decimal | None = None
    verification_status: str | None = None
    price_per_session: Decimal | None = None


class AdminUserListItem(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    status: str
    created_at: datetime
    student_profile: AdminStudentProfileSummary | None = None
    instructor_profile: AdminInstructorProfileSummary | None = None


class AdminRequestListItem(BaseModel):
    id: int
    student_id: int
    student_name: str | None = None
    title: str
    subject: str
    description_preview: str
    request_type: str
    status: str
    budget: Decimal | None = None
    created_at: datetime
    applications_count: int
    session_id: int | None = None


class AdminSessionListItem(BaseModel):
    id: int
    request_id: int
    request_title: str | None = None
    request_type: str | None = None
    student_id: int
    student_name: str | None = None
    instructor_id: int
    instructor_name: str | None = None
    status: str
    scheduled_at: datetime | None = None
    started_at: datetime | None = None
    ended_at: datetime | None = None
    completed_at: datetime | None = None
    payment_status: str | None = None
    created_at: datetime


class AdminPaymentListItem(BaseModel):
    id: int
    session_id: int
    request_id: int
    student_id: int
    student_name: str | None = None
    instructor_id: int
    instructor_name: str | None = None
    amount: Decimal
    platform_fee: Decimal
    total_amount: Decimal
    status: str
    payment_method: str
    paid_at: datetime | None = None
    released_at: datetime | None = None
    refunded_at: datetime | None = None
    created_at: datetime


class AdminReviewListItem(BaseModel):
    id: int
    session_id: int
    student_id: int
    student_name: str | None = None
    instructor_id: int
    instructor_name: str | None = None
    rating: int
    comment: str | None = None
    status: str
    created_at: datetime


class AdminActionMessageResponse(BaseModel):
    message: str


class AdminSuspendUserRequest(BaseModel):
    reason: str | None = None


class AdminRejectInstructorRequest(BaseModel):
    reason: str | None = None
