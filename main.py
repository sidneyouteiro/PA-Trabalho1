from fastapi import Depends, FastAPI
from src.database.db import Base, engine, SessionLocal
from src.database import models
from src.controller import item, usuario, emprestimo

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(item.router, prefix='/item')
app.include_router(usuario.router, prefix='/usuario')
app.include_router(emprestimo.router, prefix='/emprestimo')