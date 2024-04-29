Update 4/28/2024 - Server is currently down due to looking for alternative database hosting.

# Pilot Logbook

Logbook to track pilot flying miles using FastAPI, SQLAlchemy, Alembic for backend and React for the frontend. I will be creating this using Docker files to be able to run everything just by running the 
docker.yml file. (Currently work in progress)

## Common commands you might have to use:
``` 
alembic revision --autogenerate -m "Description" -- Used to compare local model changes with database
alembic upgrade head -- Used to push model changes to database
alembic history
alembic downgrade -"Number of revisions"
alembic downgrade "Revision Number"
pipreqs --encoding=utf8 --force --ignore .venv
```
