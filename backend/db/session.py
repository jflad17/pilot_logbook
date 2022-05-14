from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from core.config import settings

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    future=True,
    pool_size=settings.SQLALCHEMY_POOLSIZE,
    max_overflow=5,
    # pool_recycle=3600,
)
session: Session = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
