from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/ping")
def ping() -> dict[str, str]:
    return {"router": "reports", "status": "ok"}
