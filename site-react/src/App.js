import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";

import LoginPage from "./pages/login-page/component";
import TaskPage from "./pages/tasks-page/component";

import GlobalContext from "./contexts/GlobalContext";
import store from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
    const [token, setToken] = useState("");
    const [login, setLogin] = useState("");

    return (
        <Provider store={store}>
            <GlobalContext.Provider
                value={{
                    login,
                    setLogin,
                    token,
                    setToken,
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
        </Provider>
    );
}
