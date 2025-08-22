import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";

const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ userName, password });
            navigate("/login");
        } catch (err) {
            setError(err, "Login failed. Please check your credentials.");
        }
    };

    return (
        <form className="w-1/2 mx-auto" onSubmit={handleRegister}>
            <div>
                <label>User name:</label>
                <input
                    type="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required className="p-2 border rounded-md w-full"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required className="p-2 border rounded-md w-full"
                />
            </div>
            <div>
                <button className="ml-2" type="button" onClick={handleRegister}>Register</button>
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default RegisterForm;