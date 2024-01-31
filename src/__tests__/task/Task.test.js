import React, { useReducer } from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import { act } from "react-dom/test-utils";
//Components
import Task from '../../components/task/Task';
import Home from '../../pages/Home';
import {fireEvent} from "@testing-library/react";

let container = null;
beforeEach(() => {
    // met en place un élément DOM comme cible de rendu
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // nettoie en sortie de test
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const taskData = {
    name: 'Test Task',
    isCheck: false,
    date: '2022-12-31',
    statut: 'ToDo',
    bonus: {
        bonus: {
            text: 'Bonus Text',
            color: 'green',
        },
    },
};

it('should render a task', async () => {


    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => render(
        <Task
            data={taskData}
        />,
        container));

    expect(container.querySelector(".task-title > h2").textContent).toBe(taskData.name);
    const checkBox = container.querySelector(".task-container-left > input");

    expect(checkBox.checked).toBe(false);

    act(() => {
        checkBox.dispatchEvent(new MouseEvent("click"));
    })

    expect(checkBox.checked).toBe(true);
    expect(container.querySelector(".task-bottom > div").textContent).toBe("31/12/2022");
});

describe('should render all task', () => {
    it('should change the Task statut', () => {

        act(() => {
            render(<Home />, container);
        });

        let allTasks = container.querySelectorAll(".task-container");
        expect(allTasks.length).toBe(3);

        const statut = container.querySelector(".task-container:nth-child(1) .task-title  select");
        expect(statut.value).toBe("ToDo");

        act(() => fireEvent.change(statut, { target: { value: 'InProgress' } }));
        expect(statut.value).toBe("InProgress");

        const tasksFilter = container.querySelector(".home-container .home-button-right select")

        expect(tasksFilter.value).toBe("all");

        act(() => fireEvent.change(tasksFilter, { target: { value: 'ToDo' } }));

        expect(tasksFilter.value).toBe("ToDo");

        allTasks = container.querySelectorAll(".task-container");

        expect(allTasks.length).toBe(2);

        const taskButton = container.querySelector(".task-container:nth-child(1) .task-bottom button");

        act(() => {
            fireEvent.click(taskButton);
        })

        allTasks = container.querySelectorAll(".task-container");
        expect(allTasks.length).toBe(1);
    })
    it('should')
})

