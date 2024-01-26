import React from 'react';

const Task = (props) => {

    const {name, isCheck, date, statut} = props.data;

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox" onChange={props.check} checked={isCheck}/>
            </div>
            <div className="task-container-content">
                <div className="task-title">
                    <h2>{name}</h2>
                    <select value={statut} onChange={(e) => props.changeStatut(e)}>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-bottom">
                    <span style={{ color: new Date(date) < new Date() ? 'red' : 'green' }}>
                        {date.toLocaleString()}
                    </span>
                    <button onClick={props.delete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Task;