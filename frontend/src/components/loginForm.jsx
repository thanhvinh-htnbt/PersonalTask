import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate("/tasks"); 
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            console.error("Login error:", err);
        }
    };

    const handleRegister = () => {  
        navigate("/register");    
    }

    return (
        <form className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4" onSubmit={handleLogin}>
            <div>
                <label>User name:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                    }}
                    required className="p-2 border rounded-md w-full"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(""); 
                    }}
                    required className="p-2 border rounded-md w-full"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-center items-center">
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-25 h-10" type="submit">Login</button>
            </div>
            <div className="flex justify-center items-center"> 
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-25 h-10" type="button" onClick={handleRegister}>Register</button>
            </div>            
        </form>
    );
};

export default LoginForm;