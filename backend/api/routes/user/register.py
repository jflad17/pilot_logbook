import email
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import insert
from core.security import get_password_hash, validate_password, get_user
from dependencies import get_db
import models
import schemas

router = APIRouter(
    tags=["register"],
)

@router.post('/register')
async def register(newUser: schemas.NewUser, db=Depends(get_db)):
  user = get_user(db, username=newUser.username)
  if user:
    return ['error', "Username already exists!"]
  else:
    validate_password(newUser.password)
    password_hash = get_password_hash(newUser.password)
    db.execute(
      insert(models.User)
      .values(
        username=newUser.username,
        password=password_hash,
        email=newUser.email,
        firstName=newUser.firstName,
        lastName=newUser.lastName,
        loginAttempts=0,
        maxLoginAttempts=5
      )
    )
    db.commit()
    return ['success', "User created!"]