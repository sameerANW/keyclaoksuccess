// src/components/SignIn.js
import React from 'react';
import { Button } from 'primereact/button';
import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/',
  realm: 'appnetwise01',
  clientId: 'frontend-client',
};

const kc = new Keycloak(initOptions);

const SignIn = ({ setShowKeycloakUI }) => {
  const initializeKeycloak = () => {
    kc.init({
      onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256',
    }).then((auth) => {
      if (!auth) {
        window.location.reload();
      } else {
        console.info("Authenticated");
        console.log('auth', auth);
        console.log('Keycloak', kc);
        console.log('Access Token', kc.token);

        kc.onTokenExpired = () => {
          console.log('token expired');
        };
      }
    }, () => {
      console.error("Authentication Failed");
    });
  };

  const handleSignIn = () => {
    setShowKeycloakUI(true);
    initializeKeycloak();
  };

  return (
    <div className="grid">
      <div className="col-12">
        <h1>Welcome to My Secured App</h1>
        <Button label="Sign In" onClick={handleSignIn} className="m-2 p-button-success" />
        <Button label="Sign Up" onClick={() => window.location.href = 'http://localhost:8080/auth/realms/appnetwise01/protocol/openid-connect/registrations'} className="m-2 p-button-info" />
      </div>
    </div>
  );
};

export default SignIn;
