import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { Lock, User } from 'lucide-react';

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(username, password);
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
          <div className="auth-form-title">Create account</div>
          <div className="auth-form-subtitle">Join BackChannel — it only takes a moment</div>

          <form onSubmit={handleSubmit}>

            <div className="auth-field">
              <label>Username</label>
              <div style={{ position: 'relative' }}>
                <User className="auth-input-icon" size={16} />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="choose_a_username"
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
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create account
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <button className="auth-switch-link" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;