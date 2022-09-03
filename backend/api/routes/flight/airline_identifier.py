from dependencies import get_db
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
import schemas as schemas
import models as models

router = CRUDRouter(
    schema=schemas.AirlineIdentifier,
    create_schema=schemas.AirlineIdentifier,
    update_schema=schemas.AirlineIdentifier,
    db_model=models.AirlineIdentifier,
    db=get_db,
    prefix="/airline-identifier",
    tags=["airline-identifier"],
    delete_all_route=False,
    get_one_route=False,
)
