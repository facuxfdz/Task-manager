import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Task from './components/Task';

function App() {

  //Tasks en localStorage
  let Ftask = JSON.parse(localStorage.getItem('tasks')); 

  if(!Ftask){
    Ftask = [];
  }

   //State
   const [tasks, svTask] = useState(Ftask);

  useEffect( () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, Ftask] );

  //Funciones
  const createTask = (task) =>{
      svTask([
        ...tasks,
        task
      ]);
  }

  const eliminate = (id) => {
      const newTasks = tasks.filter(task => task.id !== id );
      svTask(newTasks);
  }
  
  const title = tasks.length === 0 ? 'No hay tareas' : 'Administra tus tareas';

  return (
    <Fragment>

    <h1>Administrador de Tareas</h1>

    <div className="container">
        <div className="row">
            <div className="one-half column">
                <h1>Crea una nueva tarea</h1>
                <Form 
                  createTask={createTask}
                />
            </div>
            <div className="one-half column">
                <h1>{title}</h1>
                {tasks.map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    eliminate={eliminate}
                  />
                ))}

            </div>
        </div>
    </div>

    </Fragment>
  );
}


export default App;
