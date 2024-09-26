import React, { useState } from 'react';
import FormularioEntrada from './components/FormularioEntrada';
import ListaCompras from './components/ListaCompras';
import SelectorLista from './components/SelectorLista';

function App() {
  const [listas, setListas] = useState([
    { id: 1, nombre: 'Lista Principal', color: '#3498db', items: [] }
  ]);
  const [listaActual, setListaActual] = useState(1);

  const agregarLista = (nombre, color) => {
    setListas([...listas, { id: Date.now(), nombre, color, items: [] }]);
  };

  const cambiarLista = (id) => {
    setListaActual(id);
  };

  const agregarItem = (item) => {
    setListas(listas.map(lista => 
      lista.id === listaActual 
        ? { ...lista, items: [...lista.items, { id: Date.now(), texto: item, cantidad: 1, comprado: false }] }
        : lista
    ));
  };

  const eliminarItem = (id) => {
    setListas(listas.map(lista => 
      lista.id === listaActual 
        ? { ...lista, items: lista.items.filter(item => item.id !== id) }
        : lista
    ));
  };

  const editarItem = (id, nuevoTexto) => {
    setListas(listas.map(lista => 
      lista.id === listaActual 
        ? { ...lista, items: lista.items.map(item => 
            item.id === id ? { ...item, texto: nuevoTexto } : item
          )}
        : lista
    ));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad > 0) {
      setListas(listas.map(lista => 
        lista.id === listaActual 
          ? { ...lista, items: lista.items.map(item =>
              item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )}
          : lista
      ));
    }
  };

  const toggleComprado = (id) => {
    setListas(listas.map(lista => 
      lista.id === listaActual 
        ? { ...lista, items: lista.items.map(item =>
            item.id === id ? { ...item, comprado: !item.comprado } : item
          ).sort((a, b) => {
            if (a.comprado === b.comprado) return 0;
            if (a.comprado) return 1;
            return -1;
          })}
        : lista
    ));
  };

  const listaActualObj = listas.find(lista => lista.id === listaActual);

  return (
    <div className="app">
      <h1>Listas de Compras</h1>
      <SelectorLista 
        listas={listas} 
        listaActual={listaActual} 
        onCambiarLista={cambiarLista} 
        onAgregarLista={agregarLista}
      />
      <div style={{ borderColor: listaActualObj.color }} className="lista-actual">
        <h2>{listaActualObj.nombre}</h2>
        <FormularioEntrada onAgregarItem={agregarItem} />
        <ListaCompras 
          items={listaActualObj.items} 
          onEliminarItem={eliminarItem}
          onEditarItem={editarItem}
          onCambiarCantidad={cambiarCantidad}
          onToggleComprado={toggleComprado}
        />
      </div>
    </div>
  );
}

export default App;