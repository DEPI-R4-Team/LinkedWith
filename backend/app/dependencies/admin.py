from fastapi import Depends, HTTPException, status

from app.dependencies.auth import get_current_user
from app.models import User


def require_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Admin access is required. Current role: {current_user.role}",
        )

    if current_user.status == "suspended":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account is suspended.")

    return current_user
