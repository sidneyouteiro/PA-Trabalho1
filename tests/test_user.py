from fastapi.testclient import TestClient
from main import app

from src.database.db import get_db
from src.database.models import Usuario

client = TestClient(app)

def test_create_user():
    db = next(get_db())
    last_user = db.query(Usuario).order_by(Usuario.usuario_id.desc()).first()

    global new_user_id
    new_user_id = 1 if not last_user else last_user.usuario_id + 1

    response = client.post(
        '/usuario/',
        json={ 'usuario_nome':'NomeTeste', 'usuario_email': 'teste@gmail.com' })
    
    assert response.status_code == 201
    assert response.json() == { 'usuario_id': new_user_id, 'usuario_nome':'NomeTeste','usuario_email':'teste@gmail.com'} 

def test_delete_user():
    response = client.delete(
        '/usuario/' + str(new_user_id))
    assert response.status_code == 204