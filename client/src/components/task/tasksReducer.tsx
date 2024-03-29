import React, {useReducer} from "react";
//Interface
import {IBonus, ITask} from "../../interaces/Interfaces";

const allAction = {
    deleteTask: "delete_task",
    checkTask: "check_task",
    deleteAllCheckTask: "delete_all_check_tasks",
    checkAllTasks: "check_all_tasks",
    deCheckAllTasks: "de_check_all_tasks",
    changeStatut: "change_statut",
    filterStatut: "filter_statut",
    addTask: "add_task"
}

interface IState {
    filter: string
    tasks: ITask[]
}

// Définir le type pour l'action
type Action = {
    type: string,
    payload?: ITask,
    statut?: string,
    title?: string,
    date?: Date,
    bonus?: IBonus
};

function reducer(state: IState, action: Action) {
    const {
        deleteTask,
        checkTask,
        deleteAllCheckTask,
        checkAllTasks,
        deCheckAllTasks,
        changeStatut,
        filterStatut,
        addTask
    } = allAction;

    switch (action.type){
        case deleteTask: {
            return{
                ...state,
                tasks: state.tasks.filter(task => task !== action.payload)
            }
        }
        case checkTask : {
            return{
                ...state,
                tasks: state.tasks.map(task => action.payload === task ? ({
                    ...task,
                    isCheck: !task.isCheck
                }): task)
            }
        }
        case deleteAllCheckTask : {
            return{
                ...state,
                tasks: state.tasks.filter(task => !task.isCheck)
            }
        }
        case checkAllTasks : {
            return {
                ...state,
                tasks: state.tasks.map(task => task.statut === state.filter || state.filter === "all" ? {
                    ...task,
                    isCheck: true
                } :  task)
            }
        }
        case deCheckAllTasks : {
            return {
                ...state,
                tasks: state.tasks.map(task => task.statut === state.filter || state.filter === "all" ? {
                    ...task,
                    isCheck: false
                } :  task)
            }
        }
        case changeStatut : {
            return {
                ...state,
                tasks: state.tasks.map(task => action.payload === task ? {
                    ...task,
                    statut: action.statut
                } : task)
            }
        }
        case filterStatut : {
            return {
                ...state,
                filter: action.statut
            }
        }
        case addTask : {
            return {
                ...state,
                tasks: [
                    {
                        id: state.tasks.length + 1,
                        name: action.title,
                        isCheck: false,
                        date: action.date,
                        statut: action.statut,
                        bonus: action.bonus
                    },
                    ...state.tasks
                ]
            }
        }
        default: return state;
    }
}

export function useTodos(){
    const {
        deleteTask,
        checkTask,
        deleteAllCheckTask,
        checkAllTasks,
        deCheckAllTasks,
        changeStatut,
        filterStatut,
        addTask
    } = allAction;

    const [state, dispatch] = useReducer<typeof reducer>(reducer, {
        filter: "all",
        tasks: [
            {
                "id": 1,
                "name": "faire les courses",
                "isCheck": false,
                "date": new Date("2024-01-05"),
                "statut": "ToDo"
            },
            {
                "id": 2,
                "name": "faire la vaiselle",
                "isCheck": false,
                "date": new Date("2024-01-05"),
                "statut": "ToDo"
            },
            {
                "id": 3,
                "name": "allez au sport",
                "isCheck": false,
                "date": new Date("2024-01-05"),
                "statut": "ToDo"
            }
        ]
    });

    const visibleTask = state.filter !== "all" ? state.tasks.filter((task: { statut: string; }) => state.filter === task.statut) : state.tasks

    const allTaskIsCheck = state.tasks.filter((task: { isCheck: boolean; }) => task.isCheck).length === state.tasks.length;

    return{
        visibleTask: visibleTask,
        allTaskIsCheck: allTaskIsCheck,
        deleteAllCheckTask: () => dispatch({type: deleteAllCheckTask}),
        checkAllTask: () => dispatch({type: checkAllTasks}),
        deCheckAllTask: () => dispatch({type: deCheckAllTasks}),
        filterStatut: (e: { target: { value: string; }; }) => dispatch( {type: filterStatut, statut: e.target.value }),
        addTask: (title: string, date: Date, statut: string, bonus: IBonus) => dispatch({ type: addTask, title, date, statut, bonus}),
        deleteTask: (task: ITask) => dispatch({ type: deleteTask, payload: task}),
        checkTask: (task: ITask) => dispatch({ type: checkTask, payload: task}),
        changeTaskStatut: (e: { target: { value: string; }; }, task: ITask) => dispatch({ type: changeStatut, payload: task, statut: e.target.value})
    }
}