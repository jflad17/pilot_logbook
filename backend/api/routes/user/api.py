from fastapi import APIRouter
from . import login

user_router = APIRouter()
user_router.include_router(login.router)
