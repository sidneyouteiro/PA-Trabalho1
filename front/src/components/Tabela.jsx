import React from 'react';

const Tabela = ({ headers, linhas }) => {
  return (
    <div className='table-responsive'>
      <table className='table table-hover'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, index) => (
            <tr key={index}>
              {linha.map((item, index) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Tabela;
