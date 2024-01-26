import React, { useState } from 'react';
import {useTodos} from "../components/tasksReducer";
//Components
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";

const Home = () => {

    const [createTask, setCreateTask] = useState(false);

    const {visibleTask,
        addTask,
        changeTaskStatut,
        checkAllTask,
        checkTask,
        deleteAllCheckTask,
        deleteTask,
        filterStatut
    } = useTodos();

    return(
        <div className="home-container">
            <div className="home-title-container">
                <h1>Tasks</h1>
            </div>
            <div className="home-button-action">
                <div className="home-button-left">
                    <button onClick={() => deleteAllCheckTask()}>Delete all check Tasks</button>
                    <button onClick={() => checkAllTask()}>Check all Tasks</button>
                    <button style={{backgroundColor: createTask && 'blue' , color: createTask && 'white'}} onClick={() => setCreateTask(!createTask)}>Add Task</button>
                </div>
                <div className="home-button-right">
                    <select onChange={(e) => filterStatut(e)}>
                        <option value="all">All</option>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
            <div className="tasks-list">
                {createTask &&
                    <CreateTask addTodo={(title, date, statut) => addTask(title, date, statut)}/>
                }
                {
                    visibleTask.map((task, idx) => {
                        return(
                            <Task
                                key={idx}
                                data={task}
                                delete={() => deleteTask(task)}
                                check={() => checkTask(task)}
                                changeStatut={(e) => changeTaskStatut(e, task)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;