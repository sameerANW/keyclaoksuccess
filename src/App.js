import React, { useState, useEffect } from 'react';
import keycloak from './components/keycloak';
import AuthPage from './components/AuthPage';

const App = () => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Initialize Keycloak
    keycloak.init({ onLoad: 'check-sso', promiseType: 'native' })
      .then(authenticated => {
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        setAuthenticated(authenticated);
        setKeycloakInitialized(true);

        // If the user is authenticated, get their username from Keycloak
        if (authenticated) {
          const user = keycloak.tokenParsed?.preferred_username;
          setUsername(user);
        }
      })
      .catch(err => {
        console.error('Keycloak initialization failed:', err);
        setKeycloakInitialized(true);
      });
  }, []);

  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {authenticated ? (
        <h1>Welcome, {username}!</h1>  // Display username after login
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default App;
