import React, { useEffect, useState } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaItem = () => {
  const [linhas, setLinhas] = useState([]);
  const [nome, setnome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const headers = ["ID", "Nome", "Categoria", "Quantidade"]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/item');
      const json = await response.json();
      setLinhas(json['itens'].map(obj => {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "item_nome": nome,
        "categoria": categoria,
        "quantidade_total": quantidadeTotal,
        "detalhes": { "teste": "teste" }
      })
    };
    fetch('http://localhost:8000/item', requestOptions)
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
      <div className=''>
        <div className='row'>
          <div className='col titulo'>
            <h1>Tabela de Itens</h1>
          </div>
          <div className='col btn-novo'>
            <button className='btn btn-primary' onClick={() => handleShow()}>Novo</button>
          </div>
        </div>
        <div className='card p-3'>
          <Tabela headers={headers} linhas={linhas}></Tabela>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Nome&nbsp;
                <input className="input"
                  type="text"
                  value={nome}
                  onChange={(event) => setnome(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Categoria&nbsp;
                <input className="input"
                  type="text"
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Detalhes&nbsp;
                <input className="input"
                  type="text"
                  value={detalhes}
                  onChange={(event) => setDetalhes(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Quantidade Total&nbsp;
                <input className="input"
                  type="number"
                  value={quantidadeTotal}
                  onChange={(event) => setQuantidadeTotal(event.target.value)}
                />
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

export default TabelaItem;