import React, {useState} from "react";
//Components
import Colors, {allColors} from "./Colors";

const CreateTask = (props) => {

    const [color, setColor] = useState(allColors[0]);

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        props.addTodo(formData.get('title'), formData.get('date'), formData.get('statut'), formData.get('bonus'), color);
        e.target.reset();
    }

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox"/>
            </div>
            <form className="task-container-content" onSubmit={(e) => handleSubmit(e)}>
                <div className="task-title">
                    <input type="text" name="title"/>
                    <select name="statut">
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-bottom">
                    <input type="date" name="date"/>
                    <button type="submit">Submit</button>
                </div>
                <div className="task-bonus">
                    <input type="text" name="bonus"/>
                    <Colors color={color} setColor={setColor}/>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;