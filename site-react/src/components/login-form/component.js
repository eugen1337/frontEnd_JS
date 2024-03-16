import { useNavigate } from "react-router-dom";
import "./style.css";

import {
    useGetToken,
    useLoginDispatcher,
    useLoginListener,
    usePasswordDispatcher,
    usePasswordListener,
    useTokenDispatcher,
} from "../../state/broker.js";

export default function LoginForm(props) {
    const navigate = useNavigate();

    const login = useLoginListener();
    const loginDispatch = useLoginDispatcher();

    const password = usePasswordListener();
    const passwordDispatch = usePasswordDispatcher();

    const getToken = useGetToken();

    const queryLogin = async () => {
        const res = await getToken();

        if (res) {
            navigate("/tasks");
        } else console.log("token is null");
    };

    const queryRegister = async () => {
        const isLogged = await (
            await import("../../transport/api.js")
        ).register({
            username: login,
            password: password,
        });
        if (isLogged) {
            navigate("/tasks");
        }
    };

    return (
        <>
            <div className="wrapper">
                <h2>Registration</h2>
                <form action="#">
                    <div className="input-box">
                        <input
                            id="login"
                            type="text"
                            placeholder="login"
                            value={login}
                            onChange={(event) => {
                                loginDispatch(event.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(event) => {
                                passwordDispatch(event.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="but-box">
                        <input
                            id="login-btn"
                            type="button"
                            value="login"
                            onClick={queryLogin}
                        />
                    </div>
                    <div className="but-box">
                        <input
                            id="register-btn"
                            type="button"
                            value="register"
                            onClick={queryRegister}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
