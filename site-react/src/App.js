import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";

import LoginPage from "./pages/login-page/component";
import TaskPage from "./pages/tasks-page/component";

import GlobalContext from "./GlobalContext";


export default function App() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <GlobalContext.Provider
            value={{
                login: login,
                setLogin: setLogin,
                password: password,
                setPassword: setPassword,
            }}
        >
            <Router>
                <>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/tasks" element={<TaskPage />} />
                    </Routes>
                </>
            </Router>
        </GlobalContext.Provider>
    );
}
