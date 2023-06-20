import React, { useState } from 'react';

import Tabela from "../components/Tabela";
import Navbar from '../components/Navbar';
import { Modal } from 'react-bootstrap';

const TabelaEmprestimo = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis data, status, quantidade, usuarioId e itemId
    // para enviar os dados ao servidor.
  };

  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [usuarioId, setUsuarioId] = useState('');
  const [itemId, setItemId] = useState('');

  const headers = ["ID", "Data", "Status", "Quantidade", "Usuario", "Item"]
  const linhas = [
    [1, "10/02/2023", "Emprestado", 1, "Boto", "Arduino Uno"],
    [2, "12/02/2023", "Devolvido", 2, "Bubuxo", "DHT-11"],
    [3, "03/03/2023", "Emprestado", 1, "Lobo", "Rio"],
    [3, "03/03/2023", "Emprestado", 1, "Lobo", "Mouse"],
  ];

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
            <label>
              Data:
              <input className="input"
                type="text"
                value={data}
                onChange={(event) => setData(event.target.value)}
              />
            </label>
            <br />
            <label>
              Status:
              <input className="input"
                type="text"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
            </label>
            <br />
            <label>
              Quantidade:
              <input className="input"
                type="number"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
              />
            </label>
            <br />
            <label>
              Usuário ID:
              <select
                value={usuarioId}
                onChange={(event) => setUsuarioId(event.target.value)}
              >
                <option value="">Selecione um usuário</option>
                <option value="1">Usuário 1</option>
                <option value="2">Usuário 2</option>
                <option value="3">Usuário 3</option>
              </select>
            </label>
            <br />
            <label>
              Item ID:
              <select
                value={itemId}
                onChange={(event) => setItemId(event.target.value)}
              >
                <option value="">Selecione um item</option>
                <option value="1">Item 1</option>
                <option value="2">Item 2</option>
                <option value="3">Item 3</option>
              </select>
            </label>
            <br />
            <button className="btn btn-primary" type="submit">Salvar</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TabelaEmprestimo;