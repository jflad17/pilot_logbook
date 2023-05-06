from fastapi import APIRouter
from .flight.api import flight_router
from .user.api import user_router
from .imports.api import imports_router
from .report.api import report_router

api_router = APIRouter()
api_router.include_router(flight_router)
api_router.include_router(user_router)
api_router.include_router(imports_router)
api_router.include_router(report_router)
