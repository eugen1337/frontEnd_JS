import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../contexts/GlobalContext.js";
import "./style.css";

export default function LogoutButton(props) {
    const navigate = useNavigate();

    let { login, setLogin } = useContext(GlobalContext);

    const handleClick = () => {
        setLogin("");
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
