import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Emprestimo = () => {
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [usuarioId, setUsuarioId] = useState('');
  const [itemId, setItemId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis data, status, quantidade, usuarioId e itemId
    // para enviar os dados ao servidor.
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Tela de Formulário</h1>
      <div className='card p-3'>
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
        <button className="btn btn-primary"type="submit">Salvar</button>
      </form>
    </div>
    </div>
  );
};

export default Emprestimo;
