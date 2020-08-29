import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({createTask}) => {

    //States
    
    const [task, actTask] = useState({ //Planteo los valores iniciales de la tarea
        task_name: '',
        user_name: '',
        task_date: '',
        task_time: '',
        Description: ''
    });

    const [error, handleError] = useState(false);
    const [error2, handleError2] = useState(false);

    //Funciones
    const handleChange = (event) => {
        actTask({ //Le voy a pasar el objeto task a la funcion
            ...task, //Como abajo se pierde la referencia a los otros target, tomo una copia de todos
            [event.target.name]: event.target.value 
        })
    }
    const submitTask = event =>{
        event.preventDefault(); //Este método evita la acción por default de un evento cualesquiera

        //Validando
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if(dd <10){
            dd = '0' + dd;
        }
        if(mm < 10){
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;

        if  (   task_name.trim() === '' || 
                user_name.trim() === '' ||
                task_date.trim() === '' ||
                task_time.trim() === '' ||
                Description.trim() === ''
            ){
                handleError(true);
                return;
            }else{
                handleError(false);
            }
        if( task_date.trim() < today){
            handleError2(true);
            return;
        }else{
            handleError2(false);
        }
        

        //Asignando un ID
        task.id = uuidv4();
        
        //Creando una task
        createTask(task);

        //Reiniciando el form
        actTask({  //Funciona gracias a que a los inputs tienen como value el valor de estas variables
            task_name: '',
            user_name: '',
            task_date: '',
            task_time: '',
            Description: ''
        })
    }

    //Datos
    const {task_name, user_name, task_date, task_time, Description} = task

    return ( 
        <Fragment>
            
            {   error
            
            ? <p className="alerta-error">Todos los campos son obligatorios</p>
            
            : null
            }
            {   error2

            ? <p className="alerta-error">La fecha debe ser posterior o igual a la actual</p>
            
            : null

            }
            <form
                onSubmit={submitTask}
            >
                <label>Tarea</label>
                <input
                    type="text"
                    name="task_name"
                    className="u-full-width"
                    placeholder="Titulo de la tarea"
                    onChange={handleChange}
                    value={task_name}
                />
                <label>Tu nombre</label>
                <input
                    type="text"
                    name="user_name"
                    className="u-full-width"
                    placeholder="Tu nombre"
                    onChange={handleChange}
                    value={user_name}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="task_date"
                    className="u-full-width"
                    onChange={handleChange}
                    value={task_date}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="task_time"
                    className="u-full-width"
                    onChange={handleChange}
                    value={task_time}
                />
                <label>Descripcion</label>
                <textarea
                    className="u-full-width text-area"
                    name="Description"
                    placeholder="Escribe una descripcion"
                    onChange={handleChange}
                    value={Description}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Añadir</button>

            </form>

        </Fragment>
     );
}
 
Form.propTypes = {
    createTask: PropTypes.func.isRequired
}
  
export default Form;