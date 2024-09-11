import React from 'react';
import keycloak from './keycloak';

const AuthPage = () => {
  const handleSignUp = () => {
    const redirectUri = window.location.origin + '/welcome';
    keycloak.register({ redirectUri });
  };

  const handleSignIn = () => {
    const redirectUri = window.location.origin + '/welcome';
    keycloak.login({ redirectUri });
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Welcome to the Application</h1>
        <button
          onClick={handleSignIn}
          style={{ ...buttonStyle }}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          style={{ ...buttonStyle }}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
