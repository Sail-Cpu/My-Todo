import React from 'react';
//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Task = (props) => {

    const {name, isCheck, date, statut, bonus} = props.data;

    function isTomorrow(inputDate) {
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
                    <div>
                        {reFormatDate()}
                    </div>
                    <button onClick={props.delete}>Delete</button>
                </div>
                {bonus &&
                    <div className="task-bonus">
                        <div className='bonus'>
                            <div className="bonus-back" style={{backgroundColor: bonus?.color}}></div>
                            <div className='bonus-color' style={{backgroundColor: bonus?.color}}></div>
                            <span style={{color: bonus?.color}}>{bonus?.text}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Task;