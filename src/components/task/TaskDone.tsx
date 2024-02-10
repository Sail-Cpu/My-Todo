import React, {ChangeEvent} from 'react';
//Interface
import {ITask} from '../../interaces/Interfaces';

type Props = {
    data: ITask,
    check: (task: ITask) => void
    changeStatut: (event: ChangeEvent<HTMLSelectElement>, task: ITask) => void
}

const TaskDone = ({data, check, changeStatut} : Props) => {

    const {name, isCheck, statut} = data;

    return(
        <div className="task-container task-done">
            <div className="task-container-left">
                <input type="checkbox" onChange={() => check(data)} checked={isCheck}/>
            </div>
            <div className="task-container-content">
                <div className=" task-title">
                    <h2>{name}</h2>
                </div>
                <select value={statut} onChange={(e) => changeStatut(e, data)}>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </div>
    )
}

export default TaskDone;