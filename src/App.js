import React, { useState } from 'react';
import FormularioEntrada from './components/FormularioEntrada';
import ListaCompras from './components/ListaCompras';
import SelectorLista from './components/SelectorLista';
import Modal from './components/Modal';

function App() {
  const [listas, setListas] = useState([
    { id: 1, nombre: 'Lista Principal', color: '#3498db', items: [] }
  ]);
  const [listaActual, setListaActual] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [listaAEliminar, setListaAEliminar] = useState(null);

  const agregarLista = (nombre, color) => {
    setListas([...listas, { id: Date.now(), nombre, color, items: [] }]);
  };

  const cambiarLista = (id) => {
    setListaActual(id);
  };

  const confirmarEliminarLista = (id) => {
    setListaAEliminar(id);
    setModalAbierto(true);
  };

  const eliminarLista = () => {
    const nuevasListas = listas.filter(lista => lista.id !== listaAEliminar);
    setListas(nuevasListas);
    if (listaActual === listaAEliminar) {
      setListaActual(nuevasListas[0]?.id || null);
    }
    setModalAbierto(false);
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
        onConfirmarEliminarLista={confirmarEliminarLista}
      />
      {listaActualObj && (
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
      )}
      <Modal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)}
        onConfirm={eliminarLista}
        title="Confirmar eliminación"
        message="¿Estás seguro de que quieres eliminar esta lista?"
      />
    </div>
  );
}

export default App;