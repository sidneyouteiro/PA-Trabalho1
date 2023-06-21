from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.db import Base, engine, SessionLocal
from src.database import models
from src.controller import item, usuario, emprestimo

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(item.router, prefix='/item')
app.include_router(usuario.router, prefix='/usuario')
app.include_router(emprestimo.router, prefix='/emprestimo')