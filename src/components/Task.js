import React from 'react';
import PropTypes from 'prop-types';

const Task = ({task, eliminate}) => {

    const {task_name, user_name, task_date, task_time, Description} = task;
  

    return(
    <div className="cita">
        <p>Nombre tarea: <span>{task_name}</span></p>
        <p>Nombre usuario: <span>{user_name}</span></p>
        <p>Fecha tarea: <span>{task_date}</span></p>
        <p>Hora tarea: <span>{task_time}</span></p>
        <p>Descripción tarea: <span>{Description}</span></p>
        <button 
            className="button eliminate u-full-width" 
            onClick={ () => eliminate(task.id) }
        
        >Eliminar &times;</button>
    </div>
 );
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    eliminate: PropTypes.func.isRequired
}
 
export default Task;