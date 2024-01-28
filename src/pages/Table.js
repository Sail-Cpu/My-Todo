import React from 'react';
import { useTodos } from "../components/task/tasksReducer";
import Task from "../components/task/Task";

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
                <table>
                    <thead>
                    <tr>
                        <th>ToDo</th>
                        <th>InProgress</th>
                        <th>Done</th>
                    </tr>
                    </thead>
                    <tbody>
                        {visibleTask.map((task, idx) => (
                            <tr key={idx}>
                                <td>{task.statut === "ToDo" && <Task data={task} delete={() => deleteTask(task)} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)} />}</td>
                                <td>{task.statut === "InProgress" && <Task data={task} delete={() => deleteTask(task)} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)} />}</td>
                                <td>{task.statut === "Done" && <Task data={task} delete={() => deleteTask(task)} check={() => checkTask(task)} changeStatut={(e) => changeTaskStatut(e, task)} />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;