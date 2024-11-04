import React from 'react';
import Tarea from './Tarea';

function ListaTareas({ tareas, eliminarTarea, editarTarea, toggleCompletada }) {
  return (
    <ul className="list-group">
      {tareas.map((tarea, index) => (
        <Tarea
          key={tarea.id}
          tarea={tarea.texto}
          completada={tarea.completada}
          fecha={tarea.fecha}
          onDelete={() => eliminarTarea(tarea.id)}
          onEdit={(nuevoTexto) => editarTarea(tarea.id, nuevoTexto, index)}
          onToggleCompletada={() => toggleCompletada(tarea.id, index)}
        />
      ))}
    </ul>
  );
}

export default ListaTareas;
