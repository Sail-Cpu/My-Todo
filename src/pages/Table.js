import React from 'react';
import { useTodos } from "../components/task/tasksReducer";
import Task from "../components/task/Task";
import TaskDone from "../components/task/TaskDone";

const Table = () => {

    const {visibleTask,
        changeTaskStatut,
        checkTask,
        deleteTask,
    } = useTodos();

    return(
        <div className="page table-container">
            <div className="page-title-container">
                <h1>Table</h1>
            </div>
            <div className="table-content-container">
                <div className="table-task-container">
                    <div className="table-title">
                        <h1>ToDo</h1>
                    </div>
                    <div className="all-tasks">
                        {
                            visibleTask.map((task, idx) => {
                                return task.statut === "ToDo" &&  <Task key={idx} data={task} delete={() => deleteTask(task)} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)}
                                />
                            })
                        }
                    </div>
                </div>
                <div className="table-task-container">
                    <div className="table-title">
                        <h1>InProgress</h1>
                    </div>
                    <div className="all-tasks">
                        {
                            visibleTask.map((task, idx) => {
                                return task.statut === "InProgress" &&  <Task key={idx} data={task} delete={() => deleteTask(task)} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)}/>
                            })
                        }
                    </div>
                </div>
                <div className="table-task-container">
                    <div className="table-title">
                        <h1>Done</h1>
                    </div>
                    <div className="all-tasks">
                        {
                            visibleTask.map((task, idx) => {
                                return task.statut === "Done" && <TaskDone key={idx} data={task} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;