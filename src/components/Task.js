import React from 'react';

const Task = (props) => {

    const {name, isCheck, date} = props.data;

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox" onChange={props.check} checked={isCheck}/>
            </div>
            <div className="task-container-content">
                <h2>{name}</h2>
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