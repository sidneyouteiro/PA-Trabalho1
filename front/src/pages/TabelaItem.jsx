import React, { useState } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaItem = () => {
  const [itemNome, setItemNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis itemNome, categoria, detalhes e quantidadeTotal
    // para enviar os dados ao servidor.
  };

  const headers = ["ID", "Nome", "Categoria", "Quantidade"]
  const linhas = [
    [1, "Rio", "Desktop", 1],
    [2, "Arduino Uno", "Embarcado", 2],
    [3, "DHT-11", "Sensor", 4],
    [4, "Floripa", "Notebook", 1],
    [5, "HCSR-04", "Sensor", 7],
    [5, "Mouse", "Periférico", 5],
  ];

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
            <label>
              Item Nome:
              <input className="input"
                type="text"
                value={itemNome}
                onChange={(event) => setItemNome(event.target.value)}
              />
            </label>
            <br />
            <label>
              Categoria:
              <input className="input"
                type="text"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              />
            </label>
            <br />
            <label>
              Detalhes:
              <input className="input"
                type="text"
                value={detalhes}
                onChange={(event) => setDetalhes(event.target.value)}
              />
            </label>
            <br />
            <label>
              Quantidade Total:
              <input className="input"
                type="number"
                value={quantidadeTotal}
                onChange={(event) => setQuantidadeTotal(event.target.value)}
              />
            </label>
            <br />
            <button className="btn btn-primary" type="submit">Salvar</button>
          </form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TabelaItem;