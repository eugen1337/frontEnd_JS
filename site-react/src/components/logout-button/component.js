import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../GlobalContext.js";

import Manager from "../../manager.js";
import "./style.css";

export default function LogoutButton(props) {
    const navigate = useNavigate();

    let { login, setLogin, setPassword } = useContext(GlobalContext);

    const manager = new Manager();

    const handleClick = () => {
        setLogin("");
        setPassword("");
        manager.updateState("username", "");
        manager.updateState("passwd", "");
        navigate("/");
    };

    return (
        <>
            <div className="logout">
                <span>user {login}</span>
                <input
                    id="back-but"
                    type="button"
                    value="Выйти"
                    onClick={handleClick}
                />
            </div>
        </>
    );
}
