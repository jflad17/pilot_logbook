from db.session import session
from core.security import get_token_data, get_user, oauth2_scheme
from fastapi import HTTPException, Depends, status
from fastapi.security import SecurityScopes
from sqlalchemy.orm import Session


def get_db():
    db: Session = session()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme), db=Depends(get_db)
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = f"Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    token_data = get_token_data(token, credentials_exception)

    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    if user.disabled:
        raise HTTPException(status_code=400, detail="User account disabled.")

    return user
