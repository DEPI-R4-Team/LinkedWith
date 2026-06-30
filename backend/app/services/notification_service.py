from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Notification, User


def create_notification(
    db: Session,
    user_id: int | None,
    type: str,
    title: str,
    message: str,
    link_url: str | None = None,
) -> Notification | None:
    if user_id is None:
        return None

    user_exists = db.scalar(select(User.id).where(User.id == user_id))
    if user_exists is None:
        return None

    notification = Notification(
        user_id=user_id,
        type=type,
        title=title,
        message=message,
        link_url=link_url,
    )
    db.add(notification)
    return notification


def create_notifications(
    db: Session,
    user_ids: list[int | None] | tuple[int | None, ...] | set[int | None],
    type: str,
    title: str,
    message: str,
    link_url: str | None = None,
) -> list[Notification]:
    notifications: list[Notification] = []
    seen: set[int] = set()

    for user_id in user_ids:
        if user_id is None or user_id in seen:
            continue
        seen.add(user_id)
        notification = create_notification(db, user_id, type, title, message, link_url)
        if notification is not None:
            notifications.append(notification)

    return notifications
