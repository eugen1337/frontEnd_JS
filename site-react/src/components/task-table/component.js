import { useState, useEffect, useContext } from "react";
import Task from "../task/component.js";

import "./style.css";
import TaskHeader from "../task-header/component.js";
import TasksPagecontext from "../../contexts/TasksPageContext.js";
import GlobalContext from "../../contexts/GlobalContext.js";

export default function TaskTable(props) {
    let { tasks, setTasks } = useContext(TasksPagecontext);
    let { token, login } = useContext(GlobalContext);

    const update = async () => {
        const resTasks = await (
            await import("../../transport/api.js")
        ).getTasks({
            token: token,
        });

        console.log(resTasks);

        if (resTasks) {
            const taskArray = JSON.parse(resTasks).docs;
            console.log(taskArray);
            setTasks(taskArray);
        } else {
            console.log("tasks is null");
        }
    };

    const handleAdd = async () => {
        const value1 = document.getElementById("value1").value;
        const value2 = document.getElementById("value2").value;

        const result = await (
            await import("../../transport/api.js")
        ).createTask({
            token: token,
            username: login,
            value1: value1,
            value2: value2,
        });

        if (!result) {
            console.log("create error");
        }

        update();
    };

    const tasksList = tasks.map((val) => {
        return <Task key={val.id} task={val} updateTasks={update} />;
    });

    return (
        <>
            <div>
                <input
                    className="task-create"
                    type="button"
                    value="Обновить"
                    onClick={update}
                />
                <input
                    className="task-create"
                    type="button"
                    value="Добавить"
                    onClick={handleAdd}
                />
                <input
                    className="task-create"
                    type="text"
                    id="value1"
                    placeholder="a"
                />
                <input
                    className="task-create"
                    type="text"
                    id="value2"
                    placeholder="b"
                />
            </div>
            <table>
                <tbody>
                    <TaskHeader />
                    {tasksList}
                </tbody>
            </table>
        </>
    );
}
