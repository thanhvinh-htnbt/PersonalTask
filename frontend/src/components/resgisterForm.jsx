import { useState } from "react";

export default function ResgisterForm({ onRegister }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleResgister = async (e) => {
        e.preventDefault();
        try {
            await onRegister({ userName, password });
        } catch (err) {
            setError(err, "Login failed. Please check your credentials.");
        }
    };

    return (
        <form className="w-1/2 mx-auto" onSubmit={handleResgister}>
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
                <button className="ml-2" type="button" onClick={handleResgister}>Register</button>
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
};