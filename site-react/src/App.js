import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login-page/component";
import TaskPage from "./pages/tasks-page/component";

import buildProvider from "./storage/builder";

const Provider = buildProvider();

export default function App() {
    return (
        <Provider>
            <Router>
                <>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/tasks" element={<TaskPage />} />
                    </Routes>
                </>
            </Router>
        </Provider>
    );
}
