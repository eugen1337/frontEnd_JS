import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../GlobalContext.js";

import Manager from "../../manager.js";
import "./style.css";

export default function LoginForm(props) {
    const navigate = useNavigate();

    let { login, setLogin } = useContext(GlobalContext);
    let { password, setPassword } = useContext(GlobalContext);

    const manager = new Manager();

    const handleLogin = (event) => {
        setLogin(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const queryLogin = () => {
        manager.updateState("username", login);
        manager.updateState("password", password);
        manager.query("login");

        if (manager.getState("logged")) {
            navigate("/tasks");
        }
    };

    const queryRegister = () => {
        manager.updateState("username", login);
        manager.updateState("password", password);
        manager.query("register");

        if (manager.getState("logged")) {
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
                            onChange={handleLogin}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePassword}
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
