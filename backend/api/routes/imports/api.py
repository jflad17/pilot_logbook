from fastapi import APIRouter
from . import flight_imports

imports_router = APIRouter()
imports_router.include_router(flight_imports.router)