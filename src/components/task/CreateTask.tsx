import React, {useRef, useState} from "react";
//Components
import Colors, {allColors} from "./Colors";
import {toast} from "sonner";
import { ITask, IBonus } from "../../interaces/Interfaces";

type Props = {
    addTodo: (title: string, date: Date, statut: string, myBonus?: IBonus) => void
}

const CreateTask = ({addTodo} : Props) => {

    const [color, setColor] = useState(allColors[0]);
    const formRef = useRef<HTMLFormElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const dateString = formData.get('date') as string;
        const statut = formData.get('statut') as string;
        const bonus = formData.get('bonus') || '' as string;
        if(dateString.length === 0){
            toast.error('The task could not be created', {
                description: 'A task must have a due date',
            })
            return;
        }
        const date = new Date(dateString);
        if(bonus.toString().length > 0){
            let myBonus = {
                text: bonus.toString(),
                color: color
            }
            addTodo(title, date, statut, myBonus);
        }else{
            addTodo(title, date, statut);
        }
        toast.success('Task has been created');
        formRef.current?.reset();
        setColor(allColors[0]);
    }

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox"/>
            </div>
            <form ref={formRef} className="task-container-content" onSubmit={(e) => handleSubmit(e)}>
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