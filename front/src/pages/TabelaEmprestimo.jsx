import React, { useState, useEffect } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaEmprestimo = () => {
  const [linhas, setLinhas] = useState([])
  const [listaItem, setListaItem] = useState([])
  const [listaUsuario, setListaUsuario] = useState([])
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [usuarioId, setUsuarioId] = useState('');
  const [itemId, setItemId] = useState('');

  const headers = ["ID", "Data", "Status", "Quantidade", "Usuario", "Item"]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/emprestimo');
      const json = await response.json();
      setLinhas(json['emprestimos'].map(obj => {
        return Object.values(obj).map(value => {
          if (typeof value !== 'object') {
            return value;
          }
          return null;
        });
      }));
    } catch (error) {
      console.log("error", error);
    }
    try {
      const response = await fetch('http://localhost:8000/usuario');
      const json = await response.json();
      setListaUsuario(json['usuarios'].map(obj => {
        return {
          usuario_id: obj.usuario_id,
          usuario_nome: obj.usuario_nome
        };
      }));
    } catch (error) {
      console.log("error", error);
    }
    try {
      const response = await fetch('http://localhost:8000/item');
      const json = await response.json();
      setListaItem(json['itens'].map(obj => {
        return {
          item_id: obj.item_id,
          item_nome: obj.item_nome
        };
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "emprestimo_data": data,
        "emprestimo_status": status,
        "emprestimo_quantidade": quantidade,
        "emprestimo_usuario_id": usuarioId,
        "emprestimo_item_id": itemId
      })
    };
    fetch('http://localhost:8000/emprestimo', requestOptions)
      .then(response => response.json())
      .then(() => {
        handleClose()
        fetchData()
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className='row'>
        <div className='col titulo'>
          <h1 >Tabela de Empréstimos</h1>
        </div>
        <div className='col btn-novo'>
          <button className='btn btn-primary' onClick={() => handleShow()}>Novo</button>
        </div>
      </div>
      <div className='card p-3'>
        <Tabela headers={headers} linhas={linhas}></Tabela>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Empréstimo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label >
                Data&nbsp;
                <input className="input"
                  type="text"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Status&nbsp;
                <input className="input"
                  type="text"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Quantidade&nbsp;
                <input className="input"
                  type="number"
                  value={quantidade}
                  onChange={(event) => setQuantidade(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Usuário&nbsp;
                <select
                  value={usuarioId}
                  onChange={(event) => setUsuarioId(event.target.value)}
                >
                  <option value="">Selecione um Usuário</option>
                  {listaUsuario.map((item, index) => (
                    <option key={index} value={item.usuario_id}>{item.usuario_nome}</option>))
                  }
                </select>
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Item&nbsp;
                <select
                  value={itemId}
                  onChange={(event) => setItemId(event.target.value)}
                >
                  <option value="">Selecione um Item</option>
                  {listaItem.map((item, index) => (
                    <option key={index} value={item.item_id}>{item.item_nome}</option>))
                  }
                </select>
              </label>
            </div>
            <br />
            <button className="btn btn-primary" type="submit">Salvar</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TabelaEmprestimo;