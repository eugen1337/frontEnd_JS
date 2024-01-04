import "./App.css";
import LoginPage from "./pages/login-page/component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/tasks" element={<LoginPage />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;
