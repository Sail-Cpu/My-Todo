import React, {useState} from "react";
//Components
import Colors, {allColors} from "./Colors";
import {toast} from "sonner";

const CreateTask = (props) => {

    const [color, setColor] = useState(allColors[0]);

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        if(formData.get('date').length === 0){
            toast.error('The task could not be created', {
                description: 'A task must have a due date',
            })
            return;
        }
        if(formData.get('bonus').length > 0){
            props.addTodo(formData.get('title'), formData.get('date'), formData.get('statut'), formData.get('bonus'), color);
        }else{
            props.addTodo(formData.get('title'), formData.get('date'), formData.get('statut'));
        }
        toast.success('Task has been created');
        e.target.reset();
        setColor(allColors[0]);
    }

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox"/>
            </div>
            <form className="task-container-content" onSubmit={(e) => handleSubmit(e)}>
                <div className="task-title">
                    <input className="title-input" type="text" name="title"/>
                    <select className="statut-input" name="statut">
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-bottom">
                    <input className="date-input" type="date" name="date"/>
                    <button className="create-task-submit-button" type="submit">Submit</button>
                </div>
                <div className="task-bonus">
                    <input className="task-bonus-title" type="text" name="bonus"/>
                    <Colors color={color} setColor={setColor}/>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;