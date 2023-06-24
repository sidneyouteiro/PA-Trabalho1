import React from 'react';

const Tabela = ({ headers, linhas, fetchData, handleShow, setSelected, tela }) => {

  const handleDelete = (event, id) => {
    event.preventDefault();

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:8000/${tela}/${id}`, requestOptions)
      .then(response => fetchData());
  };

  return (
    <div className='table-responsive'>
      <table className='table table-hover'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, index) => (
            <tr key={index} onClick={() => {
            setSelected(linha)
            handleShow()
            }}>
              {linha.map((item, index) => (
                <td key={index}>{item}</td>
              ))}
              <td className='btn-apagar'>
                <button className='btn btn-danger' onClick={(event) => handleDelete(event, linha[0])}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >

  );
};

export default Tabela;
