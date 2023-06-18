from fastapi import Depends, FastAPI
from src.database.db import Base, engine, SessionLocal
from src.database import models
from src.controller import item

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(item.router)

@app.get('/')
def root():
    pass

@app.get('/populate')
def populate(db = Depends(get_db)):
    db_user = models.Usuario(usuario_nome='Teste',usuario_email='teste@teste.com')
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
