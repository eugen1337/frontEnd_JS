import LogoutButton from "../../components/logout-button/component.js";
import TaskTable from "../../components/task-table/component.js";
import TaskStatus from "../../components/task-status/component.js";

import TasksPageContext from "../../contexts/TasksPageContext.js";
import { useState } from "react";

export default function TaskPage(props) {
    const [tasks, setTasks] = useState([]);

    return (
        <>
            <TasksPageContext.Provider value={{ tasks, setTasks }}>
                <LogoutButton />
                <TaskTable />
                <TaskStatus />
            </TasksPageContext.Provider>
        </>
    );
}
