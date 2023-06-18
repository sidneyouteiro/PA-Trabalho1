from fastapi import RouterAPI, Depends

from src.database.db import get_db
from src.database import models

router = RouterAPI()

@router.get('/')
def get_all_itens(db = Depends(get_db)):
    return db.query(models.ItemInventario).all()

@router.post('/')
def create_item(db = Depends(get_db)):
    db_item = models.ItemInventario()
    pass

@router.post('/')
def update_item(db = Depends(get_db)):
    pass

@router.get('/')
def delete_item(db = Depends(get_db)):
    pass