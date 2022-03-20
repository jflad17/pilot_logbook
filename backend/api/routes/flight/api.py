from fastapi import APIRouter
from . import flight, pilot_type, aircraft_category, airport

flight_router = APIRouter()
flight_router.include_router(flight.router)
flight_router.include_router(pilot_type.router)
flight_router.include_router(aircraft_category.router)
flight_router.include_router(airport.router)
