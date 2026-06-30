from pydantic import BaseModel, EmailStr, Field

from app.schemas.user_schema import CurrentUserResponse, PublicRegisterRole


class TokenData(BaseModel):
    user_id: int | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    role: PublicRegisterRole
    phone: str | None = Field(default=None, max_length=32)
    education_level: str | None = Field(default=None, max_length=120)
    specialization: str | None = Field(default=None, max_length=160)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: CurrentUserResponse
