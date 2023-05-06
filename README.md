# Pilot Logbook

Logbook to track pilot flying miles using FastAPI, SQLAlchemy, Alembic for backend and React for the frontend. ̶I̶ ̶w̶i̶l̶l̶ ̶b̶e̶ ̶c̶r̶e̶a̶t̶i̶n̶g̶ ̶t̶h̶i̶s̶ ̶u̶s̶i̶n̶g̶ ̶D̶o̶c̶k̶e̶r̶ ̶f̶i̶l̶e̶s̶ ̶t̶o̶ ̶b̶e̶ ̶a̶b̶l̶e̶ ̶t̶o̶ ̶r̶u̶n̶ ̶e̶v̶e̶r̶y̶t̶h̶i̶n̶g̶ ̶j̶u̶s̶t̶ ̶b̶y̶ ̶r̶u̶n̶n̶i̶n̶g̶ ̶t̶h̶e̶ ̶d̶o̶c̶k̶e̶r̶.̶y̶m̶l̶ ̶f̶i̶l̶e̶
(I will be looking into Docker later. For now I'll just be running frontend and backend as separate files)

## Common commands you might have to use:
 ```
alembic revision --autogenerate -m "Description" -- Used to compare local model changes with database
alembic upgrade head -- Used to push model changes to database
alembic history
alembic downgrade -"Number of revisions"
alembic downgrade "Revision Number"
pipreqs --encoding=utf8 --force --ignore .venv
```
