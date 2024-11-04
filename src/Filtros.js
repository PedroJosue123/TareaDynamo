import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
function Filtros({ filtrarTareas, ordenarTareas, ordenamiento, filtro }) {
  return (
    <div className="d-flex justify-content-between mb-4">
      <div className="btn-group" role="group" aria-label="Filtros">
        <button
          type="button"
          className={`btn ${filtro === "Todas" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => filtrarTareas("Todas")}
        >
          Todas
        </button>
        <button
          type="button"
          className={`btn ${filtro === "Pendientes" ? "btn-danger" : "btn-outline-primary"}`}
          onClick={() => filtrarTareas("Pendientes")}
        >
          Pendientes
        </button>
        <button
          type="button"
          className={`btn ${filtro === "Completadas" ? "btn-success" : "btn-outline-primary"}`}
          onClick={() => filtrarTareas("Completadas")}
        >
          Completadas
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary btn-sm mr-2"
          onClick={() => ordenarTareas("asc")}
        >
          <FontAwesomeIcon icon={faSortAmountUp} />
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => ordenarTareas("desc")}
        >
          <FontAwesomeIcon icon={faSortAmountDown} />
        </button>
      </div>
    </div>
  );
}
export default Filtros;
