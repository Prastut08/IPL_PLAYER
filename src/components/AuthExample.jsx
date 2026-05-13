import React, { useState } from "react";
import { registerUser, loginUser, logoutUser } from "../utils/authUtils";
import { useAuth } from "../utils/useAuth";
import "./AuthExample.css";

const AuthExample = () => {
  const { user, profile, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!email || !password) {
      setAuthError("Email and password are required");
      return;
    }

    if (isSignUp && !name) {
      setAuthError("Name is required for signup");
      return;
    }

    let result;
    if (isSignUp) {
      result = await registerUser(email, password, name);
    } else {
      result = await loginUser(email, password);
    }

    if (!result.success) {
      setAuthError(result.error);
    } else {
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      setAuthError(result.error);
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="loader">Loading…</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card profile-card">
          <div className="profile-header">
            <div className="avatar">{(profile?.name || user.email)[0]}</div>
            <div>
              <h2 className="welcome">Welcome back</h2>
              <div className="small muted">{profile?.name || user.email}</div>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">UID</span>
              <span className="profile-value uid">{user.uid}</span>
            </div>
            {profile && (
              <>
                <div className="profile-item">
                  <span className="profile-label">XP</span>
                  <span className="profile-value xp">{profile.xp || 0}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Accuracy</span>
                  <span className="profile-value">{profile.accuracy || 0}%</span>
                </div>
              </>
            )}
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-grid">
        <aside className="auth-visual">
          <div className="brand">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="#fff" opacity="0.06"/>
              <path d="M6 12c1.5-3 6-3 7.5 0" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>CricketMind</h3>
          </div>
          <h1 className="visual-title">Predict smarter with AI</h1>
          <p className="visual-sub">Sign in to save predictions, earn XP, and access leaderboards.</p>
          <ul className="visual-features">
            <li>Personalized stats</li>
            <li>Save & compare predictions</li>
            <li>Leaderboard & rewards</li>
          </ul>
        </aside>

        <main className="auth-card">
          <h2 className="card-title">{isSignUp ? "Create account" : "Welcome back"}</h2>
          {authError && <div className="error-message">{authError}</div>}

          <div className="social-row">
            <button
              className="social-btn google"
              onClick={() => setAuthError("Social login not configured")}
              aria-label="Sign in with Google"
            >
              Sign in with Google
            </button>
            <button
              className="social-btn ghost"
              onClick={() => setAuthError("Social login not configured")}
              aria-label="Continue with GitHub"
            >
              Continue with GitHub
            </button>
          </div>

          <div className="divider"><span>or</span></div>

          <form onSubmit={handleAuthentication} className="auth-form">
            {isSignUp && (
              <div className="field">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field password-field">
              <label>Password</label>
              <div className="pw-row">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            <button type="submit" className="auth-btn primary">{isSignUp ? "Create account" : "Sign in"}</button>
          </form>

          <p className="switch-line">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError(null);
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="toggle-btn"
            >
              {isSignUp ? "Sign in" : "Create account"}
            </button>
          </p>
        </main>
      </div>
    </div>
  );
};

export default AuthExample;
