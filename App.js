import React, { useState } from 'react';
import FormularioEntrada from './components/FormularioEntrada';
import ListaCompras from './components/ListaCompras';

function App() {
  const [items, setItems] = useState([]);

  const agregarItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div className="app">
      <h1>Lista de Compras</h1>
      <FormularioEntrada onAgregarItem={agregarItem} />
      <ListaCompras items={items} />
    </div>
  );
}

export default App;