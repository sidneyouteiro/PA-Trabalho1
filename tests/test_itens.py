from fastapi.testclient import TestClient
from main import app

from src.database.db import get_db
from src.database.models import ItemInventario

client = TestClient(app)
test_url = '/item/'

def test_create_item():
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
    assert response.json() == {}

def test_get_all_itens():
    #response = client.get(test_url)
    assert True == True

def test_update_item():
    #response = client.put(test_url)
    assert True == True

def test_delete_item():
    #response = client.delete(test_url)
    assert True == True