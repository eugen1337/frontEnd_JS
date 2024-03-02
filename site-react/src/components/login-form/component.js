import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../GlobalContext.js";

import Manager from "../../manager.js";
import "./style.css";

export default function LoginForm(props) {
<<<<<<< Updated upstream
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const navigate = useNavigate();

=======
    const navigate = useNavigate();

    let { login, setLogin } = useContext(GlobalContext);
    let { password, setPassword } = useContext(GlobalContext);

>>>>>>> Stashed changes
    const manager = new Manager();

    const handleLogin = (event) => {
        setLogin(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
<<<<<<< Updated upstream
    const login = () => {
=======

    const queryLogin = () => {
        manager.updateState("username", login);
        manager.updateState("password", password);
>>>>>>> Stashed changes
        manager.query("login");

<<<<<<< Updated upstream
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
=======
        if (manager.getState("logged")) {
            navigate("/tasks");
        }
    };

    const queryRegister = () => {
        manager.updateState("username", login);
        manager.updateState("password", password);
        manager.query("register");
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
                            onClick={queryRegister}
>>>>>>> Stashed changes
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
