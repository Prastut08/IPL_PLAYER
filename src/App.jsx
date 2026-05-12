import React from 'react';
import { useAuth } from './utils/useAuth';
import CricketMindAI3D from './components/CricketMindAI3D';
import AuthExample from './components/AuthExample';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '24px'
      }}>
        Loading...
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthExample />;
  }

  // Show main app if user is logged in
  return <CricketMindAI3D />;
}

export default App;
