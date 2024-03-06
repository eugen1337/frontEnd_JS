import { useState } from "react";

import LoginForm from "../../components/login-form/component";
import LoginPageContext from "../../contexts/LoginPageContext";

export default function LoginPage(props) {
    const [password, setPassword] = useState("");

    return (
        <LoginPageContext.Provider value={{ password, setPassword }}>
            <LoginForm />
        </LoginPageContext.Provider>
    );
}
