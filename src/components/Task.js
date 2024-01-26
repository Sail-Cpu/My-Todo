import React from 'react';

const Task = (props) => {

    const {name, isCheck, date} = props.data;

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox"/>
            </div>
            <div className="task-container-content">
                <h2>{name}</h2>
                <div className="task-bottom">
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Task;