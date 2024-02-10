import React, {ChangeEvent} from 'react';
//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//Interfaces
import {ITask} from "../../interaces/Interfaces";

type Props = {
    data: ITask,
    deleteTask: (task: ITask) => void,
    check: (task: ITask) => void,
    changeStatut: (event: ChangeEvent<HTMLSelectElement>, task: ITask) => void
}

const Task = ({data, deleteTask, check, changeStatut}: Props) => {

    const {name, isCheck, date, statut, bonus} = data;

    function isTomorrow(inputDate: Date) {
        const currentDate = new Date();
        const tomorrowDate = new Date();
        tomorrowDate.setDate(currentDate.getDate() + 1);

        const formattedInputDate = new Date(inputDate).toISOString().split('T')[0];
        const formattedTomorrowDate = tomorrowDate.toISOString().split('T')[0];

        return formattedInputDate === formattedTomorrowDate;
    }

    function reFormatDate() {
        const currentDate = new Date();
        const dateObject = new Date(date);

        let color = '#878787';
        let text = dateObject.toLocaleDateString();

        if (dateObject < currentDate) {
            color = 'red';
        } else if (isTomorrow(date)) {
            color = 'orange';
            text = 'Tomorrow';
        }

        return (
            <>
                <CalendarMonthIcon style={{ color, marginRight: '5px' }} />
                <span style={{ color }}>{text}</span>
            </>
        );
    }

    return(
        <div className="task-container">
            <div className="task-container-left">
                <input type="checkbox" onChange={() => check(data)} checked={isCheck}/>
            </div>
            <div className="task-container-content">
                <div className="task-title">
                    <h2>{name}</h2>
                    <select value={statut} onChange={(e) => changeStatut(e, data)}>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-bottom">
                    <div>
                        {reFormatDate()}
                    </div>
                    <button onClick={() => deleteTask(data)}>Delete</button>
                </div>
                {bonus &&
                    <div className="task-bonus">
                        <div className='bonus'>
                            <div className="bonus-back" style={{backgroundColor: bonus.color}}></div>
                            <div className='bonus-color' style={{backgroundColor: bonus.color}}></div>
                            <span style={{color: bonus.color}}>{bonus.text}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Task;