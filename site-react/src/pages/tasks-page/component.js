import LogoutButton from "../../components/logout-button/component.js";
import TaskTable from "../../components/task-table/component.js";
import TaskStatus from "../../components/task-status/component.js";

export default function TaskPage(props) {
    return (
        <>
            <LogoutButton />
            <TaskTable />
            <TaskStatus />
        </>
    );
}
