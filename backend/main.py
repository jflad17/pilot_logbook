from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.api import api_router
from core.config import settings
from core.logger import InterceptHandler, format_record

from loguru import logger
import logging
import sys
import uvicorn

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

app.include_router(api_router)

loggers = (
    logging.getLogger(name)
    for name in logging.root.manager.loggerDict
    if name.startswith("uvicorn.")
)
for uvicorn_logger in loggers:
    uvicorn_logger.handlers = []

logging.getLogger("uvicorn").handlers = [InterceptHandler()]


logger.configure(handlers=[{"sink": sys.stdout, "level": logging.DEBUG, "format": format_record}])
if settings.SERVER == True:
    logger.add(settings.PROJECT_ROOT + "/logs/api.log", rotation="1 day")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9000)
