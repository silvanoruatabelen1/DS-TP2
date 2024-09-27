import React, { useState } from 'react';

function SelectorLista({ listas, listaActual, onCambiarLista, onAgregarLista, onConfirmarEliminarLista }) {
  const [nuevaLista, setNuevaLista] = useState({ nombre: '', color: '#000000' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaLista.nombre.trim()) {
      onAgregarLista(nuevaLista.nombre, nuevaLista.color);
      setNuevaLista({ nombre: '', color: '#000000' });
    }
  };

  return (
    <div className="selector-lista">
      <div className="pestanas">
        {listas.map(lista => (
          <div key={lista.id} className="pestana-container">
            <button 
              onClick={() => onCambiarLista(lista.id)}
              className={`pestana ${listaActual === lista.id ? 'activa' : ''}`}
              style={{ borderColor: lista.color }}
            >
              {lista.nombre}
              {listas.length > 1 && (
                <span 
                  className="boton-eliminar-lista"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfirmarEliminarLista(lista.id);
                  }}
                >
                  ×
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="nueva-lista-form">
        <input
          type="text"
          value={nuevaLista.nombre}
          onChange={(e) => setNuevaLista({ ...nuevaLista, nombre: e.target.value })}
          placeholder="Nombre de nueva lista"
        />
        <input
          type="color"
          value={nuevaLista.color}
          onChange={(e) => setNuevaLista({ ...nuevaLista, color: e.target.value })}
        />
        <button type="submit">Agregar Lista</button>
      </form>
    </div>
  );
}

export default SelectorLista;