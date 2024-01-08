import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Manager from "../../manager.js";
import "./style.css";

export default function LogoutButton(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    const manager = new Manager();

    const handleClick = () => {
        manager.updateState("username", "");
        manager.updateState("passwd", "");
        navigate("/");
    };

    useEffect(() => {
        setUsername(manager.getState("username"));
    }, []);

    return (
        <>
            <div className="logout">
                <span>user {username}</span>
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
