"""add session completion fields and reviews table

Revision ID: 20260630_0005
Revises: 20260630_0004
Create Date: 2026-06-30
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260630_0005"
down_revision: str | None = "20260630_0004"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("sessions", sa.Column("instructor_marked_completed_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("sessions", sa.Column("student_confirmed_completed_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("sessions", sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True))

    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("comment", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=32), server_default="visible", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["session_id"], ["sessions.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id", "student_id", name="uq_review_session_student"),
    )
    op.create_index(op.f("ix_reviews_id"), "reviews", ["id"], unique=False)
    op.create_index(op.f("ix_reviews_instructor_id"), "reviews", ["instructor_id"], unique=False)
    op.create_index(op.f("ix_reviews_session_id"), "reviews", ["session_id"], unique=False)
    op.create_index(op.f("ix_reviews_student_id"), "reviews", ["student_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_reviews_student_id"), table_name="reviews")
    op.drop_index(op.f("ix_reviews_session_id"), table_name="reviews")
    op.drop_index(op.f("ix_reviews_instructor_id"), table_name="reviews")
    op.drop_index(op.f("ix_reviews_id"), table_name="reviews")
    op.drop_table("reviews")
    op.drop_column("sessions", "completed_at")
    op.drop_column("sessions", "student_confirmed_completed_at")
    op.drop_column("sessions", "instructor_marked_completed_at")
