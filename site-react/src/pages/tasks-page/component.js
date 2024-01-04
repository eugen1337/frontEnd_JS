import LogoutButton from '../../components/logout-button/component.js';
import '../../components/task-table/component.js'
import '../../components/task-status/component.js'
// import '../../components/tasks-header/component.js'

import LoginForm from "../../components/login-form/component";

export default function TaskPage(props) {
    return (
        <>
            <LogoutButton />
            <TaskTable/>
            <TaskStatus/>
        </>
    );
}