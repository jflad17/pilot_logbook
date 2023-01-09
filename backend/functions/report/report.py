from fastapi import HTTPException, status
from . import summary

from fastapi.responses import Response

def get_response(db, name, params):
  reports = {}
  response = Response()
  reports = pdf_reports()
  func = reports.get(name, None)
  if not func:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Report '{name}' couldn't be found!"
    )
  else:
    response = func(db, **params)
  return response


def pdf_reports():
  reports = {}
  reports["Airplane Summary"] = summary.AirplaneSummaryPDF
  return reports