from fastapi.testclient import TestClient
from main import app

from src.database.db import get_db
from src.database.models import ItemInventario, Emprestimo, Usuario
from src.utilities.db_utilities import DatabaseDecoder, DatabaseEncoder

client = TestClient(app)
test_url = '/emprestimo/'

test_user = Usuario(**{
    'usuario_nome':'NomeTeste',
    'usuario_email': 'teste@gmail.com'
})

test_item_encoded = DatabaseEncoder(**{
    'item_nome': 'DesktopTeste',
    'categoria': 'desktop',
    'detalhes': {
        'processador': 'Intel i9-9800',
        'RAM': '32Gb',
        'HD': '1Tb'
    },
    'quantidade_total': 1
}).encode()
test_item = ItemInventario(**test_item_encoded) 


db = next(get_db())
db.add(test_item)
db.add(test_user)
db.commit()
db.refresh(test_item)
db.refresh(test_user)


def test_create_emprestimo():
    last_emprestimo = db.query(Emprestimo).order_by(Emprestimo.emprestimo_id.desc()).first()
    global new_emprestimo_id
    new_emprestimo_id = 1 if not last_emprestimo else last_emprestimo.emprestimo_id + 1

    response = client.post(
        test_url,
        json={
            'emprestimo_data': '19-07-2023',
            'emprestimo_status': 'Emprestado', 
            'emprestimo_quantidade': 1,
            'emprestimo_usuario_id': test_user.usuario_id,
            'emprestimo_item_id': test_item.item_id,
        })
    assert response.status_code == 201
    assert response.json() == {
        'emprestimo_id': new_emprestimo_id,
        'emprestimo_data': '19-07-2023',
        'emprestimo_status': 'Emprestado', 
        'emprestimo_quantidade': 1,
        'emprestimo_usuario_id': test_user.usuario_id,
        'emprestimo_item_id': test_item.item_id,
    }

def test_get_all_emprestimos():
    response = client.get(test_url)
    emprestimos_bd = [i.get_dict() for i in db.query(Emprestimo).limit(15).all()]
    
    assert response.status_code == 200
    assert response.json() == { 'emprestimos': emprestimos_bd }

def test_update_emprestimo():
    response = client.put(
        test_url+str(new_emprestimo_id),
        json={
            'emprestimo_status': 'Devolvido', 
            'emprestimo_quantidade': 1,
        }
    )
    updated_emprestimo = db.query(Emprestimo).filter(Emprestimo.emprestimo_id == new_emprestimo_id).first().get_dict()
    assert response.status_code == 200
    assert response.json() == updated_emprestimo

def test_delete_emprestimo():
    response = client.delete(test_url+str(new_emprestimo_id))
    deleted_item = db.query(Emprestimo).filter(Emprestimo.emprestimo_id == new_emprestimo_id).first()
    assert response.status_code == 204
    assert not deleted_item
