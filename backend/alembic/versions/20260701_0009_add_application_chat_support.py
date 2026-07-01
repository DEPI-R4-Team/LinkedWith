"""add application chat support

Revision ID: 20260701_0009
Revises: 20260701_0008
Create Date: 2026-07-01
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260701_0009"
down_revision: str | None = "20260701_0008"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.alter_column("messages", "session_id", existing_type=sa.Integer(), nullable=True)
    op.add_column("messages", sa.Column("application_id", sa.Integer(), nullable=True))
    op.create_index(op.f("ix_messages_application_id"), "messages", ["application_id"], unique=False)
    op.create_foreign_key(
        op.f("fk_messages_application_id_applications"),
        "messages",
        "applications",
        ["application_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_check_constraint(
        "ck_messages_single_chat_context",
        "messages",
        "(session_id IS NOT NULL AND application_id IS NULL) OR "
        "(session_id IS NULL AND application_id IS NOT NULL)",
    )


def downgrade() -> None:
    op.drop_constraint("ck_messages_single_chat_context", "messages", type_="check")
    op.drop_constraint(op.f("fk_messages_application_id_applications"), "messages", type_="foreignkey")
    op.drop_index(op.f("ix_messages_application_id"), table_name="messages")
    op.drop_column("messages", "application_id")
    op.alter_column("messages", "session_id", existing_type=sa.Integer(), nullable=False)
