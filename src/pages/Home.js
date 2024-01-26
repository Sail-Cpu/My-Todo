import React, {useEffect, useReducer, useState} from 'react';
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
            "date": "2024-01-02",
            "statut": "ToDo"
        }
    ]
}

function reducer(state, action) {

}

const Home = () => {

    const [state, dispatch] = useReducer(reducer, allTasks);

    console.log(state)

    return(
        <div className="home-container">
            <div className="home-title-container">
                <h1>Tasks</h1>
            </div>
            <div className="tasks-list">
                {
                    state.tasks.map((task, idx) => {
                        return(
                            <Task key={idx} data={task} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;