import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

function Tarea({ tarea, onDelete, onEdit, completada, onToggleCompletada }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tarea);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${completada ? 'bg-success text-white' : ''}`}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={completada}
          onChange={onToggleCompletada}
        />
        {isEditing ? (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          </div>
        ) : (
          <label className="form-check-label">{tarea}</label>
        )}
      </div>
      <div>
        <button className="btn btn-danger btn-sm mr-2" onClick={onDelete}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
        <button className="btn btn-warning btn-sm" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </li>
  );
}

export default Tarea;
