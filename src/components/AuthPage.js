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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Welcome to the Application</h1>
        <button onClick={handleSignIn} className="button">
          Sign In
        </button>
        <button onClick={handleSignUp} className="button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
