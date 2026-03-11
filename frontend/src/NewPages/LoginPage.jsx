import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-page">

      {/* Left brand panel */}
      <div className="auth-brand">
        <div className="brand-logo">BackChannel</div>
        <div className="brand-tagline">
          Private conversations that leave no trace. Say what you mean.
        </div>

        <div className="brand-decoration">
          <div className="brand-message-preview">
            Messages that disappear when you're done with them 👋
          </div>
          <div className="brand-message-preview right">
            Finally, a chat app that respects privacy ✨
          </div>
          <div className="brand-message-preview">
            No logs. No history. Just the conversation.
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-title">Welcome back</div>
          <div className="auth-form-subtitle">Sign in to your BackChannel account</div>

          <form onSubmit={handleSubmit}>

            <div className="auth-field">
              <label>Username</label>
              <div style={{ position: 'relative' }}>
                <User className="auth-input-icon" size={16} />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock className="auth-input-icon" size={16} />
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign in
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <button className="auth-switch-link" onClick={() => navigate('/signup')}>
              Create one
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;