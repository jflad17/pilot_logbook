from .base import Base


class User(Base):
    idUser: int
    username: str
    resetPassword: bool
    disabled: bool
    loginAttempts: int
    maxLoginAttempts: int


class Token(Base):
    access_token: str
    token_type: str

class NewUser(Base):
    username: str
    password: str