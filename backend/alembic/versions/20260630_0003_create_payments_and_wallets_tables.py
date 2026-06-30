"""create payments and wallets tables

Revision ID: 20260630_0003
Revises: 20260630_0002
Create Date: 2026-06-30
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260630_0003"
down_revision: str | None = "20260630_0002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "payments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("request_id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("amount", sa.Numeric(10, 2), nullable=False),
        sa.Column("platform_fee", sa.Numeric(10, 2), nullable=False),
        sa.Column("total_amount", sa.Numeric(10, 2), nullable=False),
        sa.Column("status", sa.String(length=32), server_default="pending", nullable=False),
        sa.Column("payment_method", sa.String(length=32), server_default="card_simulation", nullable=False),
        sa.Column("paid_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("released_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("refunded_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["request_id"], ["requests.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["session_id"], ["sessions.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_payments_id"), "payments", ["id"], unique=False)
    op.create_index(op.f("ix_payments_instructor_id"), "payments", ["instructor_id"], unique=False)
    op.create_index(op.f("ix_payments_request_id"), "payments", ["request_id"], unique=False)
    op.create_index(op.f("ix_payments_session_id"), "payments", ["session_id"], unique=False)
    op.create_index(op.f("ix_payments_student_id"), "payments", ["student_id"], unique=False)

    op.create_table(
        "instructor_wallets",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("pending_balance", sa.Numeric(10, 2), server_default="0", nullable=False),
        sa.Column("available_balance", sa.Numeric(10, 2), server_default="0", nullable=False),
        sa.Column("total_earned", sa.Numeric(10, 2), server_default="0", nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("instructor_id"),
    )
    op.create_index(op.f("ix_instructor_wallets_id"), "instructor_wallets", ["id"], unique=False)
    op.create_index(op.f("ix_instructor_wallets_instructor_id"), "instructor_wallets", ["instructor_id"], unique=False)

    op.create_table(
        "wallet_transactions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("instructor_id", sa.Integer(), nullable=False),
        sa.Column("payment_id", sa.Integer(), nullable=True),
        sa.Column("type", sa.String(length=32), nullable=False),
        sa.Column("amount", sa.Numeric(10, 2), nullable=False),
        sa.Column("status", sa.String(length=32), server_default="completed", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["instructor_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["payment_id"], ["payments.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_wallet_transactions_id"), "wallet_transactions", ["id"], unique=False)
    op.create_index(op.f("ix_wallet_transactions_instructor_id"), "wallet_transactions", ["instructor_id"], unique=False)
    op.create_index(op.f("ix_wallet_transactions_payment_id"), "wallet_transactions", ["payment_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_wallet_transactions_payment_id"), table_name="wallet_transactions")
    op.drop_index(op.f("ix_wallet_transactions_instructor_id"), table_name="wallet_transactions")
    op.drop_index(op.f("ix_wallet_transactions_id"), table_name="wallet_transactions")
    op.drop_table("wallet_transactions")
    op.drop_index(op.f("ix_instructor_wallets_instructor_id"), table_name="instructor_wallets")
    op.drop_index(op.f("ix_instructor_wallets_id"), table_name="instructor_wallets")
    op.drop_table("instructor_wallets")
    op.drop_index(op.f("ix_payments_student_id"), table_name="payments")
    op.drop_index(op.f("ix_payments_session_id"), table_name="payments")
    op.drop_index(op.f("ix_payments_request_id"), table_name="payments")
    op.drop_index(op.f("ix_payments_instructor_id"), table_name="payments")
    op.drop_index(op.f("ix_payments_id"), table_name="payments")
    op.drop_table("payments")
