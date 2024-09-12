import { useState } from "react";
import { useNavigate } from "react-router-dom"; 


export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'Admin' && password === '12345') {
            setIsAuthenticated(true);
            navigate('/admin-dashboard'); 
        } else {
            alert('Incorrect username or password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div
                className="container mt-5"
                style={{
                    maxWidth: '400px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleLogin} className="p-4">
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return null;
}
