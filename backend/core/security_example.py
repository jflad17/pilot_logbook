from datetime import datetime, timedelta
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
import re
from models.user import User as user_model
from schemas import TokenData
from sqlalchemy import select
from pydantic import ValidationError


# To create secret key, run below
# openssl rand -hex 32

SECRET_KEY: str = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def validate_password(password):
    minLength = bool(not len(password) < 8)
    maxLength = bool(not len(password) > 50)
    digit = bool(re.search(r"\d", password))
    uppercase = bool(re.search(r"[A-Z]", password))
    lowercase = bool(re.search(r"[a-z]", password))
    symbol = bool(re.search(r"[ !@#$%&'()*+,-./[\\\]^_`{|}~" + r'"]', password))

    if not (minLength and maxLength and digit and uppercase and lowercase and symbol):
        raise HTTPException(status_code=422, detail="Passwords do not meet requirements.")


def get_user(db, username: str):
    user: user_model = (
        db.execute(select(user_model).where(user_model.username == username)).scalars().first()
    )
    if user:
        return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_token_data(token, credentials_exception):
    token_data = None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (JWTError, ValidationError):
        raise credentials_exception
    return token_data
