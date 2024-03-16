import { useNavigate } from "react-router-dom";
import {
    useLoginDispatcher,
    useLoginListener,
    usePasswordDispatcher,
    useTokenDispatcher,
    useTasksDispatcher,
} from "../../state/broker";
import "./style.css";

export default function LogoutButton(props) {
    const navigate = useNavigate();

    const login = useLoginListener();

    const loginDispatch = useLoginDispatcher();
    const passwordDispatch = usePasswordDispatcher();
    const tokenDispatch = useTokenDispatcher();
    const tasksDispatch = useTasksDispatcher();

    return (
        <>
            <div className="logout">
                <span>user {login}</span>
                <input
                    id="back-but"
                    type="button"
                    value="Выйти"
                    onClick={() => {
                        loginDispatch("");
                        passwordDispatch("");
                        tokenDispatch("");
                        tasksDispatch([]);

                        navigate("/");
                    }}
                />
            </div>
        </>
    );
}
