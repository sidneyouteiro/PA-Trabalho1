import json

class DatabaseData():
    def __init__(self, item_nome, categoria, quantidade_total, detalhes):
        self.item_nome = item_nome
        self.categoria = categoria
        self.quantidade_total = quantidade_total
        self.detalhes = detalhes

class DatabaseEncoder(DatabaseData):
    def __init__(self, item_nome=None, categoria=None, quantidade_total=None, detalhes=None):
        super().__init__(item_nome, categoria, quantidade_total, detalhes)
    
    def encode(self):
        response = {}
        if self.item_nome:
            response['item_nome'] = self.item_nome
        if self.categoria:
            response['categoria'] = self.categoria
        if self.quantidade_total:
            response['quantidade_total'] = self.quantidade_total
        if self.detalhes:
            response['detalhes'] = json.dumps(self.detalhes)

        return response

class DatabaseDecoder(DatabaseData):
    def __init__(self, item_id, item_nome, categoria, quantidade_total, detalhes):
        super().__init__(item_nome, categoria, quantidade_total, detalhes)
        self.item_id = item_id

    def decode(self):
        response = {}

        if self.item_id:
            response['item_id'] = self.item_id
        if self.item_nome:
            response['item_nome'] = self.item_nome
        if self.categoria:
            response['categoria'] = self.categoria
        if self.quantidade_total:
            response['quantidade_total'] = self.quantidade_total
        if self.detalhes:
            response['detalhes'] = json.loads(self.detalhes)

        return response