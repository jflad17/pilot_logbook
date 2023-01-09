from functions.report.report import get_response
from db.utils import queryset_to_dict
from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from fastapi import Body, Depends
from sqlalchemy.orm import Session
from fastapi.responses import Response
import schemas as schemas
import models as models


router = CRUDRouter(
    schema=schemas.Report,
    create_schema=schemas.Report,
    db_model=models.Report,
    db=get_db,
    prefix="/report",
    tags=["report"],
    delete_all_route=False,
    get_one_route=False,
)

@router.post("/{name}/", response_class=Response)
def reportName(
    name: str,
    params: dict,
    db: Session = Depends(get_db)
):
    return get_response(db, name, params)