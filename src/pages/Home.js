import React, { useState } from 'react';
import {useTodos} from "../components/task/tasksReducer";
//Components
import Task from "../components/task/Task";
import CreateTask from "../components/task/CreateTask";
import TaskDone from "../components/task/TaskDone";
import { Toaster } from 'sonner';
const Home = () => {

    const [createTask, setCreateTask] = useState(false);

    const {visibleTask,
        addTask,
        changeTaskStatut,
        checkAllTask,
        deCheckAllTask,
        allTaskIsCheck,
        checkTask,
        deleteAllCheckTask,
        deleteTask,
        filterStatut
    } = useTodos();

    console.log(visibleTask)

    return(
        <div className="home-container">
            <Toaster position="top-right" closeButton richColors/>
            <div className="home-title-container">
                <h1>Tasks</h1>
            </div>
            <div className="home-button-action">
                <div className="home-button-left">
                    <button onClick={() => deleteAllCheckTask()}>Delete all check Tasks</button>
                    {allTaskIsCheck ?
                        <button onClick={() => deCheckAllTask()}>De Check all Tasks</button>
                        :
                        <button onClick={() => checkAllTask()}>Check all Tasks</button>
                    }
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
                    <CreateTask addTodo={addTask}/>
                }
                {
                    visibleTask.map((task, idx) => {
                        return(
                            <>
                                {task.statut !== "Done" &&
                                    <Task
                                        key={idx}
                                        data={task}
                                        delete={() => deleteTask(task)}
                                        check={() => checkTask(task)}
                                        changeStatut={(e) => changeTaskStatut(e, task)}
                                    />
                                }
                            </>
                        )
                    })
                }
                {
                    visibleTask.map((task, idx) => {
                        return(
                            <>
                                {task.statut === "Done" &&
                                    <TaskDone
                                        key={idx}
                                        data={task}
                                        check={() => checkTask(task)}
                                        changeStatut={(e) => changeTaskStatut(e, task)}
                                    />
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;