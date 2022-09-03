from fastapi import APIRouter
from . import airport, flight, pilot_type, aircraft_category, airline_identifier, aircraft

flight_router = APIRouter()
flight_router.include_router(airport.router)
flight_router.include_router(aircraft.router)
flight_router.include_router(aircraft_category.router)
flight_router.include_router(airline_identifier.router)
#flight_router.include_router(night_hours.router)
flight_router.include_router(flight.router)
flight_router.include_router(pilot_type.router)

