import "./style.css";
import Manager from "../../manager.js";
import { useEffect, useState } from "react";

export default function TaskStatus(props) {
    const [status, setStatus] = useState({});
    const manager = new Manager();

    const checkState = (stateName, state) => {
        const statusTemp = {
            count: state.list.length,
            "not started": 0,
            ready: 0,
        };

        switch (stateName) {
            case "tasks":
                state.list.forEach((task) => {
                    const stat = task.status.toLowerCase();
                    statusTemp[stat]++;
                });
                setStatus(statusTemp);
                break;
        }
    };
    const unsubscribe = () => {
        manager.unsubscribe(checkState);
    };

    useEffect(() => {
        const subscribe = async () => {
            manager.subscribe("tasks", checkState, true);
        };
        subscribe();
        return unsubscribe;
    }, []);

    return (
        <fieldset>
            <span>Количество задач: {status.count}</span>
            <span>В ожидании: {status["not started"]}</span>
            <span>Готовых: {status.ready}</span>
        </fieldset>
    );
}
