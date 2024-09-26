import React, { useState } from 'react';
import FormularioEntrada from './components/FormularioEntrada';
import ListaCompras from './components/ListaCompras';

function App() {
  const [items, setItems] = useState([]);

  const agregarItem = (item) => {
    setItems([...items, { id: Date.now(), texto: item, cantidad: 1, comprado: false }]);
  };

  const eliminarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editarItem = (id, nuevoTexto) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, texto: nuevoTexto } : item
    ));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad > 0) {
      setItems(items.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      ));
    }
  };

  const toggleComprado = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ).sort((a, b) => {
      if (a.comprado === b.comprado) return 0;
      if (a.comprado) return 1;
      return -1;
    }));
  };

  return (
    <div className="app">
      <h1>Lista de Compras</h1>
      <FormularioEntrada onAgregarItem={agregarItem} />
      <ListaCompras 
        items={items} 
        onEliminarItem={eliminarItem}
        onEditarItem={editarItem}
        onCambiarCantidad={cambiarCantidad}
        onToggleComprado={toggleComprado}
      />
    </div>
  );
}

export default App;
