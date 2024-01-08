import Manager from "../../manager.js";

import { useState, useEffect } from "react";
import Task from "../task/component.js";

import "./style.css";
import TaskHeader from "../task-header/component.js";

export default function TaskTable(props) {
    const [tasks, setTasks] = useState([]);

    const manager = new Manager();

    const handleUpdate = () => {
        manager.query("tasks");
    };

    const handleAdd = () => {
        const value1 = document.getElementById("value1").value;
        const value2 = document.getElementById("value2").value;
        manager.updateState("value1", value1);
        manager.updateState("value2", value2);
        manager.query("create");
    };

    const checkState = (stateName, state) => {
        if (stateName === "tasks") {
            const tasksList = state.list.map((val) => {
                return <Task key={val.id} task={val} />;
            });
            setTasks(tasks.concat(tasksList));
        }
    };
    const unsubscribe = () => {
        manager.unsubscribe(checkState);
    };

    useEffect(() => {
        const subscribe = async () => {
            await manager.subscribe("tasks", checkState, true);
        };
        subscribe();
        return unsubscribe;
    }, []);

    return (
        <>
            <div>
                <input className="task-create" type="button" value="Обновить" onClick={handleUpdate} />
                <input className="task-create" type="button" value="Добавить" onClick={handleAdd} />
                <input className="task-create" type="text" id="value1" placeholder="a" />
                <input className="task-create" type="text" id="value2" placeholder="b" />
            </div>
            <table>
                <tbody>
                    <TaskHeader />
                    {tasks}
                </tbody>
            </table>
        </>
    );
}
