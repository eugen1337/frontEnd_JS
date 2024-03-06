import "./style.css";
import TasksPagecontext from "../../contexts/TasksPageContext";

import { useContext, useState } from "react";

export default function TaskStatus(props) {
    let { tasks } = useContext(TasksPagecontext);

    const status = {
        count: tasks.length,
        "not started": 0,
        ready: 0,
    };

    tasks.forEach((task) => {
        const stat = task.status.toLowerCase();
        status[stat]++;
    });

    return (
        <fieldset>
            <span>Количество задач: {status.count}</span>
            <span>В ожидании: {status["not started"]}</span>
            <span>Готовых: {status.ready}</span>
        </fieldset>
    );
}
