from .base import Base


class UserBase(Base):
    username: str
    firstName: str
    lastName: str
    email: str
    

class User(UserBase):
    idUser: int
    admin: bool
    resetPassword: bool
    loginAttempts: int
    maxLoginAttempts: int

class Token(Base):
    access_token: str
    token_type: str
    user: User


class TokenData(Base):
    username: str | None = None
    scopes: list[str] = []


class NewUser(UserBase):
    password: str