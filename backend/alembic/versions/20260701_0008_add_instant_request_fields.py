"""add instant request fields

Revision ID: 20260701_0008
Revises: 20260630_0007
Create Date: 2026-07-01
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260701_0008"
down_revision: Union[str, None] = "20260630_0007"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("requests", sa.Column("accepted_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("requests", sa.Column("urgency_level", sa.String(length=32), nullable=True))


def downgrade() -> None:
    op.drop_column("requests", "urgency_level")
    op.drop_column("requests", "accepted_at")
