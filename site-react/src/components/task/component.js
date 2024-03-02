import StateManager from "../../transport/manager";

export default function Task(props) {
    const manager = new StateManager();

    const keys = ["id", "value1", "value2", "result", "status"];
    const id = props.task["id"];

    const tds = keys.map((val) => {
        return <td key={val}> {props.task[val]}</td>;
    });

    const handleDelete = () => {
        manager.updateState("id", id);
        manager.query("delete");
    };

    const handleResult = () => {
        manager.updateState("id", id);
        manager.updateState("value1", props.task["value1"]);
        manager.updateState("value2", props.task["value2"]);
        manager.query("calculation");
    };

    const task_id = "task" + id;
    return (
        <tr id={task_id}>
            {tds}
            <td>
                <input
                    type="button"
                    className="task-action"
                    value="delete"
                    onClick={handleDelete}
                />
                <input
                    type="button"
                    className="task-action"
                    value="result"
                    onClick={handleResult}
                />
            </td>
        </tr>
    );
}
