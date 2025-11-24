import { useState } from 'react';

const Register = ({ onRegister, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                onRegister();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to register');
        }
    };

    return (
        <div className="glass-card fade-in" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2 style={{ textAlign: 'center' }}>Create Account</h2>
            {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)' }}>
                Already have an account? <span onClick={onSwitchToLogin} style={{ color: 'var(--accent-color)', cursor: 'pointer' }}>Login</span>
            </p>
        </div>
    );
};

export default Register;
