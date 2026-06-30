"""create requests applications sessions tables

Revision ID: 20260630_0002
Revises: 20260630_0001
Create Date: 2026-06-30
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260630_0002"
down_revision: str | None = "20260630_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "requests",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=180), nullable=False),
        sa.Column("subject", sa.String(length=160), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("level", sa.String(length=80), nullable=True),
        sa.Column("request_type", sa.String(length=32), server_default="normal", nullable=False),
        sa.Column("session_mode", sa.String(length=32), server_default="individual", nullable=False),
        sa.Column("session_type", sa.String(length=32), server_default="online", nullable=False),
        sa.Column("preferred_datetime", sa.DateTime(timezone=True), nullable=True),
        sa.Column("base_price", sa.Numeric(10, 2), nullable=True),
        sa.Column("discount_per_extra_student", sa.Numeric(5, 2), nullable=True),
        sa.Column("minimum_price", sa.Numeric(10, 2), nullable=True),
        sa.Column("final_price_per_student", sa.Numeric(10, 2), nullable=True),
        sa.Column("max_students", sa.Integer(), nullable=True),
        sa.Column("status", sa.String(length=32), server_default="open", nullable=False),
        sa.Column("accepted_instructor_id", sa.Integer(), nullable=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["accepted_instructor_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_requests_id"), "requests", ["id"], unique=False)
    op.create_index(op.f("ix_requests_student_id"), "requests", ["student_id"], unique=False)

    op.create_table(
        "applications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("request_id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("proposed_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("status", sa.String(length=32), server_default="pending", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["request_id"], ["requests.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("request_id", "instructor_id", name="uq_application_request_instructor"),
    )
    op.create_index(op.f("ix_applications_id"), "applications", ["id"], unique=False)
    op.create_index(op.f("ix_applications_instructor_id"), "applications", ["instructor_id"], unique=False)
    op.create_index(op.f("ix_applications_request_id"), "applications", ["request_id"], unique=False)

    op.create_table(
        "sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("request_id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("session_mode", sa.String(length=32), server_default="individual", nullable=False),
        sa.Column("session_type", sa.String(length=32), server_default="online", nullable=False),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("ended_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.String(length=32), server_default="ready", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["request_id"], ["requests.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_sessions_id"), "sessions", ["id"], unique=False)
    op.create_index(op.f("ix_sessions_instructor_id"), "sessions", ["instructor_id"], unique=False)
    op.create_index(op.f("ix_sessions_request_id"), "sessions", ["request_id"], unique=False)
    op.create_index(op.f("ix_sessions_student_id"), "sessions", ["student_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_sessions_student_id"), table_name="sessions")
    op.drop_index(op.f("ix_sessions_request_id"), table_name="sessions")
    op.drop_index(op.f("ix_sessions_instructor_id"), table_name="sessions")
    op.drop_index(op.f("ix_sessions_id"), table_name="sessions")
    op.drop_table("sessions")
    op.drop_index(op.f("ix_applications_request_id"), table_name="applications")
    op.drop_index(op.f("ix_applications_instructor_id"), table_name="applications")
    op.drop_index(op.f("ix_applications_id"), table_name="applications")
    op.drop_table("applications")
    op.drop_index(op.f("ix_requests_student_id"), table_name="requests")
    op.drop_index(op.f("ix_requests_id"), table_name="requests")
    op.drop_table("requests")
