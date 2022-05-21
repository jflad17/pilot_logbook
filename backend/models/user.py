from enum import unique
from sqlalchemy import VARCHAR, Boolean, Column, ForeignKey, Integer, String, CHAR, Date, Table
from sqlalchemy.orm import relationship
from db.base import Base


class User(Base):
    idUser = Column(Integer, primary_key=True)
    admin = Column(Boolean, nullable=False, default=False)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(VARCHAR(100), nullable=False, unique=True)
    firstName = Column(String(100), nullable=False)
    lastName = Column(String(100), nullable=False)
    password = Column(CHAR(100), nullable=False)
    resetPassword = Column(Boolean, nullable=False, server_default="0")
    loginAttempts = Column(Integer, nullable=False, server_default="0")
    maxLoginAttempts = Column(Integer, nullable=False, server_default="5")
