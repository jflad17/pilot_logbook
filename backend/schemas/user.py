from .base import Base


class User(Base):
    idUser: int
    username: str
    resetPassword: bool
    disabled: bool
    loginAttempts: int
    maxLoginAttempts: int
