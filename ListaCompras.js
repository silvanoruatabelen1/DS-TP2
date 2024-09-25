import React from 'react';

function ListaCompras({ items, onEliminarItem }) {
  return (
    <div className="lista-compras">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.texto}
            <button onClick={() => onEliminarItem(item.id)} className="boton-eliminar">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;
