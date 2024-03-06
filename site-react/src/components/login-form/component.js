import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../contexts/GlobalContext.js";
import LoginPageContext from "../../contexts/LoginPageContext.js";
import "./style.css";

export default function LoginForm(props) {
    const navigate = useNavigate();

    let { login, setLogin, setToken } = useContext(GlobalContext);
    let { password, setPassword } = useContext(LoginPageContext);

    const handleLogin = (event) => {
        setLogin(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const queryLogin = async () => {
        const token = await (
            await import("../../transport/api.js")
        ).login({
            username: login,
            password: password,
        });

        if (token) {
            setToken(token);
            navigate("/tasks");
        } else {
            console.log("login is null");
        }
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
