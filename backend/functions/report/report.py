from fastapi import HTTPException, status
from . import airplaneDetailedSummary, airplaneSummary

from fastapi.responses import Response

def get_response(db, name, params):
  reports = {}
  response = Response()
  reports = pdf_reports()
  report_returned = reports.get(name, None)
  if not report_returned:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Report '{name}' couldn't be found!"
    )
  else:
    #try:
    response = report_returned(db, **params)
    # except Exception as e:
    #   raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f'{e}')
  return response


def pdf_reports():
  reports = {}
  reports["Airplane Summary"] = airplaneSummary.AirplaneSummaryPDF
  reports["Airplane Detailed Summary"] = airplaneDetailedSummary.AirplaneDetailedSummaryPDF
  return reports