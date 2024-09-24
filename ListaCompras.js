import React from 'react';

function ListaCompras({ items }) {
  return (
    <div className="lista-compras">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;