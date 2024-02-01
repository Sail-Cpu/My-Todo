import React, { useReducer } from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
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

it('Should render a unique task', async () => {


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

describe('Should render all task', () => {
    it('Should change the Task statut', () => {

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
    it('Should check all tasks, and then delete all the checked tasks', () => {
        act(() => {
            render(<Home />, container);
        })

        const checkAllTaskButton = container.querySelector(".check-all-task-button");
        let deCheckAllTaskButton = container.querySelector(".de-check-all-task-button");
        expect(deCheckAllTaskButton).not.toBeInTheDocument();
        const deleteAllCheckedTaskButton = container.querySelector(".delete-all-check-task-button");

        let allTasks = container.querySelectorAll(".task-container");

        expect(allTasks.length).toBe(3);

        act(() => {
            fireEvent.click(checkAllTaskButton);
            fireEvent.click(deleteAllCheckedTaskButton);
        })

        allTasks = container.querySelectorAll(".task-container");

        deCheckAllTaskButton = container.querySelector(".de-check-all-task-button");
        expect(deCheckAllTaskButton).toBeInTheDocument();


        expect(allTasks.length).toBe(0);
    })
    it('Should create a task', () => {
        act(() => {
            render(<Home />, container);
        })

        const createTask = container.querySelector('.create-task-button');

        act(() => {
            fireEvent.click(createTask);
        })

        const titleInput = container.querySelector('.title-input');
        const dateInput = container.querySelector('.date-input');
        const taskBonusTitle = container.querySelector('.task-bonus-title');
        const submitButton = container.querySelector('.create-task-submit-button');

        act(() => {
            fireEvent.change(titleInput, { target: { value: 'Test Task' } });
            fireEvent.change(dateInput, { target: { value: '2022-12-31' } });
            fireEvent.change(taskBonusTitle, { target: { value: 'the bonus' } });
            fireEvent.click(submitButton);
        })

        const newTaskTitle = container.querySelector('.task-container .task-title h2');
        const newTaskBonus = container.querySelector('.task-container .bonus span');

        expect(newTaskTitle.textContent).toBe('Test Task');
        expect(newTaskBonus.textContent).toBe('the bonus');
    })
})