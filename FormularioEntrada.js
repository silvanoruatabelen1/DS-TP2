import React, { useState } from 'react';

function FormularioEntrada({ onAgregarItem }) {
  const [valorEntrada, setValorEntrada] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (valorEntrada.trim() !== '') {
      onAgregarItem(valorEntrada.trim());
      setValorEntrada('');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-entrada">
      <input
        type="text"
        value={valorEntrada}
        onChange={(e) => setValorEntrada(e.target.value)}
        placeholder="Agregar un artículo"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioEntrada;