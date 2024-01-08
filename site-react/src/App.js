import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login-page/component";
import TaskPage from "./pages/tasks-page/component";

export default function App() {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/tasks" element={<TaskPage />} />
                </Routes>
            </>
        </Router>
    );
}
