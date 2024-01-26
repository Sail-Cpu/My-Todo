import {useReducer} from "react";

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

export function useTodos(){
    const [state, dispatch] = useReducer(reducer, {
        filter: "all",
        tasks: [
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
    });

    const visibleTask = state.filter !== "all" ? state.tasks.filter(task => state.filter === task.statut) : state.tasks

    return{
        visibleTask: visibleTask,
        deleteAllCheckTask: () => dispatch({type: "delete_all_check_tasks"}),
        checkAllTask: () => dispatch({type: "check_all_tasks"}),
        filterStatut: (e) => dispatch( {type: "filter_statut", statut: e.target.value }),
        addTask: (title, date, statut) => dispatch({ type: "add_task", title, date, statut}),
        deleteTask: (task) => dispatch({ type: "delete_task", payload: task}),
        checkTask: (task) => dispatch({ type: "check_task", payload: task}),
        changeTaskStatut: (e, task) => dispatch({ type: "change_statut", payload: task, statut: e.target.value})
    }
}