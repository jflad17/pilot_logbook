from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, CHAR, Date, Table
from sqlalchemy.orm import relationship
from db.base import Base


class User(Base):
    __tablename__ = "user"
    idUser = Column(Integer, primary_key=True)
    username = Column(String(100), nullable=False, unique=True)
    password = Column(CHAR(60), nullable=False)
    resetPassword = Column(Boolean, nullable=False, server_default="0")
    disabled = Column(Boolean, nullable=False, server_default="0")
    loginAttempts = Column(Integer, nullable=False, server_default="0")
    maxLoginAttempts = Column(Integer, nullable=False, server_default="5")
