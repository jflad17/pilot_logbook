from fastapi import APIRouter
from . import login, register

user_router = APIRouter()
user_router.include_router(login.router)
user_router.include_router(register.router)
