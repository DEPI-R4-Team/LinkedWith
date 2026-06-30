from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models import GroupParticipant, Message, Session as LearningSession, User
from app.schemas.message_schema import MessageCreate, MessageResponse

router = APIRouter(prefix="/messages", tags=["messages"])

CHAT_BLOCKED_STATUSES = {"cancelled", "disputed"}
CHAT_ALLOWED_STATUSES = {"ready", "active", "completed"}


@router.get("/ping")
def ping() -> dict[str, str]:
    return {"router": "messages", "status": "ok"}


def to_message_response(message: Message) -> MessageResponse:
    return MessageResponse.model_validate(message).model_copy(
        update={
            "sender_name": message.sender.full_name if message.sender else None,
            "sender_role": message.sender.role if message.sender else None,
        }
    )


def get_accessible_session(db: Session, session_id: int, current_user: User) -> LearningSession:
    session = db.scalar(
        select(LearningSession)
        .where(LearningSession.id == session_id)
        .options(selectinload(LearningSession.request))
    )
    if session is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
    if current_user.id in {session.student_id, session.instructor_id}:
        return session
    is_paid_group_participant = False
    if session.request is not None and session.request.request_type == "group":
        is_paid_group_participant = db.scalar(
            select(GroupParticipant.id).where(
                GroupParticipant.request_id == session.request_id,
                GroupParticipant.student_id == current_user.id,
                GroupParticipant.status == "active",
                GroupParticipant.payment_status.in_(["held", "released"]),
            )
        ) is not None
    if not is_paid_group_participant:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this chat.")
    return session


def ensure_session_can_chat(session: LearningSession) -> None:
    if session.status in CHAT_BLOCKED_STATUSES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Chat is not available for this session.")
    if session.status not in CHAT_ALLOWED_STATUSES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Chat is not available for this session status.")


@router.get("/session/{session_id}", response_model=list[MessageResponse])
def get_session_messages(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[MessageResponse]:
    session = get_accessible_session(db, session_id, current_user)
    ensure_session_can_chat(session)

    messages = db.scalars(
        select(Message)
        .where(Message.session_id == session_id)
        .order_by(Message.created_at.asc(), Message.id.asc())
        .options(selectinload(Message.sender))
    ).all()
    return [to_message_response(message) for message in messages]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def send_message(
    payload: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> MessageResponse:
    trimmed_message = payload.message.strip()
    if not trimmed_message:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Message cannot be empty.")

    session = get_accessible_session(db, payload.session_id, current_user)
    ensure_session_can_chat(session)

    message = Message(session_id=payload.session_id, sender_id=current_user.id, message=trimmed_message)
    db.add(message)
    db.commit()
    db.refresh(message)

    created_message = db.scalar(
        select(Message).where(Message.id == message.id).options(selectinload(Message.sender))
    )
    if created_message is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Message was not created.")
    return to_message_response(created_message)
