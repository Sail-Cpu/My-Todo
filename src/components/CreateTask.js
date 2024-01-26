import React from "react";

const CreateTask = (props) => {

    function handleSubmit(e){
        e.preventDefault();
        props.addTodo(new FormData(e.target).get('title'), new FormData(e.target).get('date'))
    }

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox"/>
            </div>
            <form className="task-container-content" onSubmit={(e) => handleSubmit(e)}>
                <div className="task-title">
                    <input type="text" name="title"/>
                    <select>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-bottom">
                    <input type="date" name="date"/>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;