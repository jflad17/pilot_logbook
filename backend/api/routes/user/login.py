from datetime import timedelta
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy import update
from fastapi.security import OAuth2PasswordRequestForm
from core.security import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate, create_access_token, get_user, get_password_hash, validate_password, verify_password
from dependencies import get_db
import models
import schemas

router = APIRouter(
    tags=["login"],
)

@router.post('/token', response_model=schemas.Token)
async def login(rememberMe: bool | None = Body(None), changed_password: str | None = Body(None), form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
  username = form_data.username
  password = form_data.password
  user = get_user(db, username=username)
  expiration = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  if rememberMe == True:
    expiration = timedelta(days=30)
  if user:
    if user.resetPassword:
      if changed_password:
        validate_password(changed_password)
        password_hash = get_password_hash(changed_password)
        db.execute(
          update(models.User)
          .where(models.User.idUser == user.idUser)
          .values(password=password_hash, resetPassword=0)
        )
        db.commit()
      else:
        raise HTTPException(status_code=403, detail="Password must be reset.")
    else:
      if user.loginAttempts >= user.maxLoginAttempts:
        raise HTTPException(status_code=402, detail="Account locked, too many login attempts.")
      if not verify_password(password, user.password):
        user.loginAttempts += 1
        db.commit()
        if user.loginAttempts >= user.maxLoginAttempts:
          raise HTTPException(status_code=402, detail="Account locked, too many login attempts.")
      if authenticate(db, username, password):
        access_token = create_access_token(data={"sub": username}, expires_delta=expiration)
        print(user)
        return {"user": user, "access_token": access_token, "token_type": "bearer"}
      else:
        raise HTTPException(status_code=401, detail="Incorrect password")
  else:
    raise HTTPException(status_code=400, detail="User doesn't exist!")
