from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models import InstructorWallet, User, WalletTransaction
from app.schemas.wallet_schema import InstructorWalletResponse, WalletTransactionResponse

router = APIRouter(prefix="/wallet", tags=["wallet"])


@router.get("/ping")
def ping() -> dict[str, str]:
    return {"router": "wallet", "status": "ok"}


def serialize_wallet(wallet: InstructorWallet) -> InstructorWalletResponse:
    return InstructorWalletResponse.model_validate(wallet).model_copy(
        update={"instructor_name": wallet.instructor.full_name if wallet.instructor else None}
    )


def get_or_create_wallet(db: Session, instructor_id: int) -> InstructorWallet:
    wallet = db.scalar(
        select(InstructorWallet)
        .where(InstructorWallet.instructor_id == instructor_id)
        .options(selectinload(InstructorWallet.instructor))
    )
    if wallet is None:
        wallet = InstructorWallet(instructor_id=instructor_id)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
    return wallet


@router.get("/instructor", response_model=InstructorWalletResponse)
def get_instructor_wallet(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InstructorWalletResponse:
    if current_user.role != "instructor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only instructors can view instructor wallets.")
    wallet = get_or_create_wallet(db, current_user.id)
    return serialize_wallet(wallet)


@router.get("/transactions", response_model=list[WalletTransactionResponse])
def get_wallet_transactions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[WalletTransactionResponse]:
    if current_user.role != "instructor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only instructors can view wallet transactions.")
    transactions = db.scalars(
        select(WalletTransaction)
        .where(WalletTransaction.instructor_id == current_user.id)
        .order_by(WalletTransaction.created_at.desc())
    ).all()
    return [WalletTransactionResponse.model_validate(transaction) for transaction in transactions]
