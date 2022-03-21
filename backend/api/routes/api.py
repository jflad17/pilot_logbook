from fastapi import APIRouter
from .flight.api import flight_router

api_router = APIRouter()
api_router.include_router(flight_router)
