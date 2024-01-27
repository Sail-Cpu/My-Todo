import React from 'react'

const TaskDone = (props) => {

    const {name, isCheck, statut} = props.data;

    return(
        <div className="task-container task-done">
            <div className="task-container-left">
                <input type="checkbox" onChange={props.check} checked={isCheck}/>
            </div>
            <div className="task-container-content">
                <div className=" task-title">
                    <h2>{name}</h2>
                </div>
                <select value={statut} onChange={(e) => props.changeStatut(e)}>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </div>
    )
}

export default TaskDone;