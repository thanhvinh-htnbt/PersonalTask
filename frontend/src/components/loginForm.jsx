import { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await onLogin({ userName, password });
        } catch (err) {
            setError(err, "Login failed. Please check your credentials.");
        }
    };

    const handleResgister = () => {
        // Handle registration logic here
        // This could redirect to a registration page or open a modal
        console.log("Redirecting to registration page...");
    }

    return (
        <form className="w-1/2 mx-auto" onSubmit={handleLogin}>
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
                <button className="ml-2" type="submit" onClick={handleLogin}>Login</button>
            </div>
            <div>
                <button className="ml-2" type="button" onClick={handleResgister}>Register</button>
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
};