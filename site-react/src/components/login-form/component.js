import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import GlobalContext from "../../contexts/GlobalContext.js";
import { ACTIONS_CREATORS } from "../../redux/actions.js";
import "./style.css";

export default function LoginForm(props) {
    const navigate = useNavigate();

    let { login, setLogin, setToken } = useContext(GlobalContext);

    let password = useSelector((state) => state.password);
    const dispatch = useDispatch();

    const handleLogin = (event) => {
        setLogin(event.target.value);
    };

    const handlePassword = (event) => {
        console.log(password);
        const action = ACTIONS_CREATORS.UPDATE("password", event.target.value);
        dispatch(action);
    };

    const queryLogin = async () => {
        const token = await (
            await import("../../transport/api.js")
        ).login({
            username: login,
            password: password,
        });

        // const action = ACTIONS_CREATORS.GET_TOKEN("password", event.target.value);
        // dispatch(action);

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

    password = "1ruewhgguio";

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
