import React, { useEffect, useState } from 'react';
import TareaForm from './TareaForm';
import ListaTareas from './ListaTareas';
import Filtros from './Filtros';
import AWS from 'aws-sdk';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION, 
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
    secretAccessKey:  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.REACT_APP_AWS_SECRET_session_token
});


const dynamoDB = new AWS.DynamoDB.DocumentClient();

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [ordenamiento, setOrdenamiento] = useState("asc");
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          var datos = dynamoDB.scan( {TableName: "Tareas"}
          ).promise();
          setTareas((await datos).Items);
      } catch (error) {
          console.error('Error obtener los datos de la tabla:', error);
      } finally {   
      }
    };

    fetchData();
  }, []);
  const agregarTarea = async (texto) => {
    if (texto.trim().length === 0) {
      setError("No puedes agregar una tarea en blanco.");
      return;
    }
    if (texto.length > 50) {
      setError("El texto de la tarea no puede tener más de 50 caracteres.");
      return;
    }
    const nuevaTarea = { 
      id :  uuidv4(),
      texto: texto ,
      completada: false , 
      fecha: new Date().getDate  
    };
      const params = {
        TableName: "Tareas", 
        Item: nuevaTarea
  }   
    try {
      dynamoDB.put(params).promise();
      console.log('Tarea agregada exitosamente:', nuevaTarea);
      setTareas([...tareas, nuevaTarea]);
      setError("");
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
  }   
  };

  const eliminarTarea = (index) => {
    try {
      dynamoDB.delete( {TableName: "Tareas",  Key: {id: index}}
      ).promise();
      
  } catch (error) {
      console.error('Error al eliminar el elemento:', error);
  }

    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  
  const editarTarea = (id, nuevoTexto, index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].texto = nuevoTexto;
    setTareas(nuevasTareas);

    const params = {
      TableName: 'Tareas', 
      Key: {
          id: id 
      },
      UpdateExpression: 'SET texto = :nuevoTexto', 
      ExpressionAttributeValues: {  
          ':nuevoTexto': nuevoTexto 
      },
      ReturnValues: 'ALL_NEW' 
  };
    try {
      const resultado = dynamoDB.update(params).promise();
      console.log('Campo actualizado:', resultado.Attributes);
  } catch (error) {
      console.error('Error al actualizar el campo:', error);
  }

  };

  const toggleCompletada = (id, index) => {
    const nuevasTareas = [...tareas];
    
    
    
    const params = {
      TableName: 'Tareas', 
      Key: {
          id: id
      },
      UpdateExpression: 'SET completada = :nuevoestado', 
      ExpressionAttributeValues: {  
          ':nuevoestado': !nuevasTareas[index].completada
      },
      ReturnValues: 'ALL_NEW' 
  };
    try {
      const resultado = dynamoDB.update(params).promise();
      console.log('Campo actualizado:', resultado.Attributes);
  } catch (error) {
      console.error('Error al actualizar el campo:', error);
  }
  nuevasTareas[index].completada = !nuevasTareas[index].completada;
  setTareas(nuevasTareas);
  };

  const filtrarTareas = (filtro) => {
    setFiltro(filtro);
  };

  const ordenarTareas = (orden) => {
    setOrdenamiento(orden);
  };

  let tareasFiltradas = tareas;
  if (filtro === "Pendientes") {
    tareasFiltradas = tareas.filter((tarea) => !tarea.completada);
  } else if (filtro === "Completadas") {
    tareasFiltradas = tareas.filter((tarea) => tarea.completada);
  }

  tareasFiltradas.sort((a, b) => {
    if (ordenamiento === "asc") {
      return a.fecha - b.fecha;
    } else {
      return b.fecha - a.fecha;
    }
  });

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="display-4 mb-4 text-primary">Lista de Tareas</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <TareaForm agregarTarea={agregarTarea} />
          <Filtros filtrarTareas={filtrarTareas} ordenarTareas={ordenarTareas} ordenamiento={ordenamiento} filtro={filtro} />
          <ListaTareas
            tareas={tareasFiltradas}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
            toggleCompletada={toggleCompletada}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
