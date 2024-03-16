import { useTokenListener } from "../../state/broker.js";

export default function Task(props) {
    const token = useTokenListener();

    const keys = ["id", "value1", "value2", "result", "status"];
    const id = props.task["id"];

    const tds = keys.map((val) => {
        return <td key={val}> {props.task[val]}</td>;
    });

    const handleDelete = async () => {
        const result = await (
            await import("../../transport/api.js")
        ).deleteTask({
            token: token,
            id: id,
        });

        if (!result) {
            console.log("delete error");
        }

        props.updateTasks();
    };

    const handleResult = async () => {
        const result = await (
            await import("../../transport/api.js")
        ).calc({
            token: token,
            id: id,
            value1: props.task["value1"],
            value2: props.task["value2"],
        });

        if (!result) {
            console.log("result error");
        }

        props.updateTasks();
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
