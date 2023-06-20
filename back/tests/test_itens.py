from fastapi.testclient import TestClient
from main import app

from src.database.db import get_db
from src.database.models import ItemInventario

client = TestClient(app)
test_url = '/item/'

def test_create_item():
    db = next(get_db())
    last_item = db.query(ItemInventario).order_by(ItemInventario.item_id.desc()).first()
    global new_item_id
    new_item_id = 1 if not last_item else last_item.item_id + 1

    response = client.post(
        test_url,
        json={ 
            'item_nome': 'DesktopTeste',
            'categoria': 'desktop',
            'detalhes': {
                'processador': 'Intel i9-9800',
                'RAM': '32Gb',
                'HD': '1Tb'
            },
            'quantidade_total': 1
        })
    assert response.status_code == 201
    assert response.json() == { 
        'item_id': new_item_id,
        'item_nome': 'DesktopTeste',
        'categoria': 'desktop',
        'detalhes': {
            'processador': 'Intel i9-9800',
            'RAM': '32Gb',
            'HD': '1Tb'
        },
        'quantidade_total': 1}

def test_get_all_itens():
    response = client.get(test_url)

    assert response.status_code == 200
    assert response.json() == {'itens':[{ 
        'item_id': new_item_id,
        'item_nome': 'DesktopTeste',
        'categoria': 'desktop',
        'detalhes': {
            'processador': 'Intel i9-9800',
            'RAM': '32Gb',
            'HD': '1Tb'
        },
        'quantidade_total': 1}]}

def test_update_item():
    db = next(get_db())
    response = client.put(
        test_url+str(new_item_id),
        json={
            'detalhes': {
                'processador': 'Intel i9-9800',
                'RAM': '16Gb',
                'HD': '1Tb'
            }
        }
    )
    updated_item = db.query(ItemInventario).filter(ItemInventario.item_id == new_item_id).first()
    assert response.status_code == 200
    assert response.json() == {
        'item_id': new_item_id,
        'item_nome': 'DesktopTeste',
        'categoria': 'desktop',
        'detalhes': {
            'processador': 'Intel i9-9800',
            'RAM': '16Gb',
            'HD': '1Tb'
        },
        'quantidade_total': 1
    }

def test_delete_item():
    db = next(get_db())
    response = client.delete(test_url+str(new_item_id))
    deleted_item = db.query(ItemInventario).filter(ItemInventario.item_id == new_item_id).first()
    assert response.status_code == 204
    assert not deleted_item