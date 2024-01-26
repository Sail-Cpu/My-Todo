import React, { useReducer } from 'react';
import Task from "../components/Task";

const allTasks = {
    tasks: [
        {
            "id": "1",
            "name": "faire les courses",
            "isCheck": false,
            "date": "2024-01-10",
            "statut": "inProgress"
        },
        {
            "id": "2",
            "name": "faire la vaiselle",
            "isCheck": false,
            "date": "2024-01-05",
            "statut": "ToDo"
        },
        {
            "id": "3",
            "name": "allez au sport",
            "isCheck": false,
            "date": "2024-02-02",
            "statut": "ToDo"
        }
    ]
}

function reducer(state, action) {
    switch (action.type){
        case "delete_task" : {
            return{
                ...state,
                tasks: state.tasks.filter(task => task !== action.payload)
            }
        }
        case "check_task" : {
            return{
                ...state,
                tasks: state.tasks.map(task => action.payload === task ? ({
                    ...task,
                    isCheck: !task.isCheck
                }): task)
            }
        }
        case "delete_all_check_tasks" : {
            return{
                ...state,
                tasks: state.tasks.filter(task => !task.isCheck)
            }
        }
        case "check_all_tasks" : {
            return {
                ...state,
                tasks: state.tasks.map(task => ( {...task, isCheck: true} ))
            }
        }
        default: return state;
    }
}

const Home = () => {

    const [state, dispatch] = useReducer(reducer, allTasks);

    console.log(state);

    return(
        <div className="home-container">
            <div className="home-title-container">
                <h1>Tasks</h1>
            </div>
            <div className="home-button-action">
                <button onClick={() => dispatch({type: "delete_all_check_tasks"})}>Delete all check Tasks</button>
                <button onClick={() => dispatch({type: "check_all_tasks"})}>Check all Tasks</button>
            </div>
            <div className="tasks-list">
                {
                    state.tasks.map((task, idx) => {
                        return(
                            <Task
                                key={idx}
                                data={task}
                                delete={() => dispatch({ type: "delete_task", payload: task})}
                                check={() => dispatch({ type: "check_task", payload: task})}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;