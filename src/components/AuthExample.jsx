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
    return <div className="auth-container">Loading...</div>;
  }

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card profile-card">
          <h2>Welcome!</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{profile?.name || user.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">UID:</span>
              <span className="profile-value uid">{user.uid}</span>
            </div>
            {profile && (
              <>
                <div className="profile-item">
                  <span className="profile-label">XP Points:</span>
                  <span className="profile-value xp">{profile.xp || 0}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Accuracy:</span>
                  <span className="profile-value">{profile.accuracy || 0}%</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Predictions:</span>
                  <span className="profile-value">{profile.predictions || 0}</span>
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
      <div className="auth-card">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {authError && <div className="error-message">{authError}</div>}
        <form onSubmit={handleAuthentication}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
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
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthExample;
