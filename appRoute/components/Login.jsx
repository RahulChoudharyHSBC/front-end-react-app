import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "secret123") {
       alert("Login successful");
        // Login successful
         navigate("/menu");

    } else {
        alert("Invalid credentials");
        navigate("/login-failed");
        //alert("Invalid credentials");

    }
};
return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Login</button>
            </div>
        </form>
</div>
);
}
