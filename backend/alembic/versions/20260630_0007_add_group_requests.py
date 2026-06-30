"""add group requests

Revision ID: 20260630_0007
Revises: 20260630_0006
Create Date: 2026-06-30
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260630_0007"
down_revision: Union[str, None] = "20260630_0006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("requests", sa.Column("max_participants", sa.Integer(), nullable=True))
    op.add_column("requests", sa.Column("min_participants", sa.Integer(), nullable=True))
    op.add_column("requests", sa.Column("min_price_per_student", sa.Numeric(10, 2), nullable=True))
    op.add_column("requests", sa.Column("current_price_per_student", sa.Numeric(10, 2), nullable=True))
    op.add_column("requests", sa.Column("group_owner_id", sa.Integer(), nullable=True))
    op.add_column("requests", sa.Column("group_status", sa.String(length=32), nullable=True))
    op.create_foreign_key("fk_requests_group_owner_id_users", "requests", "users", ["group_owner_id"], ["id"], ondelete="SET NULL")

    op.create_table(
        "group_participants",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("request_id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=32), server_default="active", nullable=False),
        sa.Column("joined_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("left_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("payment_status", sa.String(length=32), server_default="unpaid", nullable=False),
        sa.Column("payment_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["payment_id"], ["payments.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["request_id"], ["requests.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("request_id", "student_id", name="uq_group_participant_request_student"),
    )
    op.create_index(op.f("ix_group_participants_id"), "group_participants", ["id"], unique=False)
    op.create_index(op.f("ix_group_participants_payment_id"), "group_participants", ["payment_id"], unique=False)
    op.create_index(op.f("ix_group_participants_request_id"), "group_participants", ["request_id"], unique=False)
    op.create_index(op.f("ix_group_participants_student_id"), "group_participants", ["student_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_group_participants_student_id"), table_name="group_participants")
    op.drop_index(op.f("ix_group_participants_request_id"), table_name="group_participants")
    op.drop_index(op.f("ix_group_participants_payment_id"), table_name="group_participants")
    op.drop_index(op.f("ix_group_participants_id"), table_name="group_participants")
    op.drop_table("group_participants")
    op.drop_constraint("fk_requests_group_owner_id_users", "requests", type_="foreignkey")
    op.drop_column("requests", "group_status")
    op.drop_column("requests", "group_owner_id")
    op.drop_column("requests", "current_price_per_student")
    op.drop_column("requests", "min_price_per_student")
    op.drop_column("requests", "min_participants")
    op.drop_column("requests", "max_participants")
