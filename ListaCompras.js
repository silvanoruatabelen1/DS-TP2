import React, { useState } from 'react';

function ListaCompras({ items, onEliminarItem, onEditarItem, onCambiarCantidad, onToggleComprado }) {
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  const iniciarEdicion = (id, texto) => {
    setEditandoId(id);
    setTextoEditado(texto);
  };

  const guardarEdicion = (id) => {
    onEditarItem(id, textoEditado);
    setEditandoId(null);
  };

  return (
    <div className="lista-compras">
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.comprado ? 'comprado' : ''}>
            <input
              type="checkbox"
              checked={item.comprado}
              onChange={() => onToggleComprado(item.id)}
            />
            {editandoId === item.id ? (
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
                onBlur={() => guardarEdicion(item.id)}
                autoFocus
              />
            ) : (
              <span onClick={() => iniciarEdicion(item.id, item.texto)}>
                {item.texto}
              </span>
            )}
            <input
              type="number"
              value={item.cantidad}
              onChange={(e) => onCambiarCantidad(item.id, parseInt(e.target.value))}
              min="1"
            />
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
