from fastapi import APIRouter
from . import report

report_router = APIRouter()
report_router.include_router(report.router)
