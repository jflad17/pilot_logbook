from fastapi.params import Security
from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
import schemas as schemas
import models as models


router = CRUDRouter(
    schema=schemas.PilotType,
    db_model=models.PilotType,
    db=get_db,
    prefix="/pilot-type",
    tags=["pilot-type"],
    delete_all_route=False
)