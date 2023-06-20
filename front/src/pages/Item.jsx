import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Item = () => {
  const [itemNome, setItemNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    // por meio de uma requisição HTTP, como por exemplo usando fetch() ou axios.
    // Você pode usar os valores das variáveis itemNome, categoria, detalhes e quantidadeTotal
    // para enviar os dados ao servidor.
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className='card p-3'>
      <h1>Item</h1>
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
        <button className="btn btn-primary"type="submit">Salvar</button>
      </form>
    </div>
    </div>
  );
};

export default Item;
