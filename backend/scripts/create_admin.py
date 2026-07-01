from __future__ import annotations

import os
import sys
from pathlib import Path

from pydantic import EmailStr, TypeAdapter, ValidationError
from sqlalchemy import select

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from app.database import SessionLocal
from app.models import User
from app.utils.security import hash_password

email_adapter = TypeAdapter(EmailStr)
ADMIN_ROLE = "admin"
ACTIVE_STATUS = "active"


r"""
Create a local admin account manually.

Windows CMD:
    cd backend
    .venv\Scripts\activate.bat
    set ADMIN_EMAIL=admin@edumatch.com
    set ADMIN_FULL_NAME=EduMatch Admin
    set ADMIN_PASSWORD=Admin12345
    python scripts/create_admin.py

PowerShell:
    cd backend
    $env:ADMIN_EMAIL="admin@edumatch.com"
    $env:ADMIN_FULL_NAME="EduMatch Admin"
    $env:ADMIN_PASSWORD="Admin12345"
    python scripts/create_admin.py

The script uses the same DATABASE_URL/config as the backend, hashes the
password with the same utility used by registration, and never prints the
password or password hash.
"""


def require_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise SystemExit(f"Missing required environment variable: {name}")
    return value


def require_email_env(name: str) -> str:
    value = require_env(name)
    try:
        return str(email_adapter.validate_python(value)).lower()
    except ValidationError as exc:
        raise SystemExit(f"{name} must be a valid email address that can be used for login.") from exc


def print_safe_admin_info(user: User) -> None:
    print(f"Email: {user.email}")
    print(f"Role: {user.role}")
    print(f"Status: {user.status}")


def main() -> None:
    email = require_email_env("ADMIN_EMAIL")
    full_name = require_env("ADMIN_FULL_NAME")
    password = require_env("ADMIN_PASSWORD")

    if len(password) < 8:
        raise SystemExit("ADMIN_PASSWORD must be at least 8 characters long.")

    with SessionLocal() as db:
        existing_user = db.scalar(select(User).where(User.email == email))
        if existing_user is not None:
            if existing_user.role == ADMIN_ROLE:
                print("Admin already exists. Use another email or reset password manually.")
            else:
                print("A user with this email already exists. Use another email.")
            print_safe_admin_info(existing_user)
            print("No changes were made.")
            return

        admin = User(
            full_name=full_name,
            email=email,
            password_hash=hash_password(password),
            role=ADMIN_ROLE,
            status=ACTIVE_STATUS,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

    print(f"Admin account created for {email}.")
    print_safe_admin_info(admin)


if __name__ == "__main__":
    main()
