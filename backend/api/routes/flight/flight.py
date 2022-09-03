from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
import schemas as schemas
import models as models

router = CRUDRouter(
    schema=schemas.Flight,
    create_schema=schemas.FlightBase,
    update_schema=schemas.FlightBase,
    db_model=models.Flight,
    db=get_db,
    prefix="/flight",
    tags=["flight"],
    delete_all_route=False,
    get_one_route=False,
)