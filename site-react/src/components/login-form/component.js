import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Manager from "../../manager.js";
import "./style.css";

export default function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const navigate = useNavigate();

    const manager = new Manager();

    const handleUsername = (event) => {
        manager.updateState("username", event.target.value);
    };
    const handlePasswd = (event) => {
        manager.updateState("password", event.target.value);
    };
    const login = () => {
        manager.query("login");
    };

    const checkState = (stateName, state) => {
        switch (stateName) {
            case "login":
                if (state.status === "OK" && state.token !== "BAD") {
                    setUsername(username);
                    navigate("/tasks");
                } else alert("Неправильный логин или пароль!");
                break;
            case "username":
                setUsername(state);
                break;
            case "password":
                setPasswd(state);
                break;
        }
    };
    const unsubscribe = () => {
        for (let i = 0; i < 3; i++) manager.unsubscribe(checkState);
    };

    useEffect(() => {
        const subscribe = async () => {
            await manager.subscribe("login", checkState);
            await manager.subscribe("username", checkState);
            await manager.subscribe("password", checkState);
        };
        subscribe();
        return unsubscribe;
    }, []);

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
                            value={username}
                            onChange={handleUsername}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            value={passwd}
                            onChange={handlePasswd}
                            required
                        />
                    </div>
                    <div className="but-box">
                        <input
                            id="login-btn"
                            type="button"
                            value="login"
                            onClick={login}
                        />
                    </div>
                    <div className="but-box">
                        <input
                            id="register-btn"
                            type="button"
                            value="register"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
