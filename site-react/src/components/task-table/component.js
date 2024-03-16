import Task from "../task/component.js";

import "./style.css";
import TaskHeader from "../task-header/component.js";
import {
    useTasksUpdate,
    useTasksAdd,
    useTasksListener,
} from "../../state/broker.js";

export default function TaskTable(props) {
    const tasks = useTasksListener();

    const tasksUpdate = useTasksUpdate();
    const tasksAdd = useTasksAdd();

    const tasksList = tasks.map((val) => {
        return <Task key={val.id} task={val} updateTasks={tasksUpdate} />;
    });

    return (
        <>
            <div>
                <input
                    className="task-create"
                    type="button"
                    value="Обновить"
                    onClick={async () => await tasksUpdate()}
                />
                <input
                    className="task-create"
                    type="button"
                    value="Добавить"
                    onClick={async () => {
                        await tasksAdd();
                        await tasksUpdate();
                    }}
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
