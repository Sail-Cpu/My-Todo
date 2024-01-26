import React, {useReducer, useState} from 'react';
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";

const allTasks = [
    {
            "id": 1,
            "name": "faire les courses",
            "isCheck": false,
            "date": "2024-01-10",
            "statut": "InProgress"
    },
    {
            "id": 2,
            "name": "faire la vaiselle",
            "isCheck": false,
            "date": "2024-01-05",
            "statut": "ToDo"
    },
    {
            "id": 3,
            "name": "allez au sport",
            "isCheck": false,
            "date": "2024-02-02",
            "statut": "ToDo"
    }
    ]

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
        case "change_statut" : {
            return {
                ...state,
                tasks: state.tasks.map(task => action.payload === task ? {
                    ...task,
                    statut: action.statut
                } : task)
            }
        }
        case "filter_statut" : {
            return {
                ...state,
                filter: action.statut
            }
        }
        case "add_task" : {
            return {
                ...state,
                tasks: [
                    {
                        "id": state.tasks.length + 1,
                        "name": action.title,
                        "isCheck": false,
                        "date": action.date,
                        "statut": action.statut
                    },
                    ...state.tasks
                ]
            }
        }
        default: return state;
    }
}

const Home = () => {

    const [createTask, setCreateTask] = useState(false);

    const [state, dispatch] = useReducer(reducer, { filter: "all", tasks: allTasks });

    const visibleTask = state.filter !== "all" ? state.tasks.filter(task => state.filter === task.statut) : state.tasks

    console.log(state.tasks)

    return(
        <div className="home-container">
            <div className="home-title-container">
                <h1>Tasks</h1>
            </div>
            <div className="home-button-action">
                <div className="home-button-left">
                    <button onClick={() => dispatch({type: "delete_all_check_tasks"})}>Delete all check Tasks</button>
                    <button onClick={() => dispatch({type: "check_all_tasks"})}>Check all Tasks</button>
                    <button style={{backgroundColor: createTask && 'blue' , color: createTask && 'white'}} onClick={() => setCreateTask(!createTask)}>Add Task</button>
                </div>
                <div className="home-button-right">
                    <select onChange={(e) => dispatch( {type: "filter_statut", statut: e.target.value } )}>
                        <option value="all">All</option>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
            <div className="tasks-list">
                {createTask &&
                    <CreateTask addTodo={(title, date, statut) => dispatch({ type: "add_task", title, date, statut})}/>
                }
                {
                    visibleTask.map((task, idx) => {
                        return(
                            <Task
                                key={idx}
                                data={task}
                                delete={() => dispatch({ type: "delete_task", payload: task})}
                                check={() => dispatch({ type: "check_task", payload: task})}
                                changeStatut={(e) => dispatch({ type: "change_statut", payload: task, statut: e.target.value})}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;