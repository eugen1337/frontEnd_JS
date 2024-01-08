export default function TaskHeader(props) {
    const titles = ["id", "a", "b", "result", "status", "actions"];
    const td_titles = titles.map((elem) => {
        return <td key={elem}> {elem} </td>;
    });

    return <tr id="task-header">{td_titles}</tr>;
}
