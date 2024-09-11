import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';

// Init Options for Keycloak (init only when needed)
let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'appnetwise01',
  clientId: 'frontend-client',
};

let kc = new Keycloak(initOptions);

function App() {
  const [showKeycloakUI, setShowKeycloakUI] = useState(false); // Show Keycloak forms after clicking Sign In
  const [infoMessage, setInfoMessage] = useState('');

  const initializeKeycloak = () => {
    kc.init({
      onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
      checkLoginIframe: true,
      pkceMethod: 'S256'
    }).then((auth) => {
      if (!auth) {
        window.location.reload();
      } else {
        console.info("Authenticated");
        console.log('auth', auth);
        console.log('Keycloak', kc);
        console.log('Access Token', kc.token);

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

        kc.onTokenExpired = () => {
          console.log('token expired');
        };
      }
    }, () => {
      console.error("Authentication Failed");
    });
  };

  const handleSignIn = () => {
    setShowKeycloakUI(true);  // Show the Keycloak UI only after Sign In
    initializeKeycloak(); // Initialize Keycloak login process
  };

  const callBackend = () => {
    httpClient.get('https://mockbin.com/request')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      {!showKeycloakUI ? (
        // The landing page with Sign In and Sign Up buttons
        <div className="grid">
          <div className="col-12">
            <h1>Welcome to My Secured App</h1>
            <Button label="Sign In" onClick={handleSignIn} className="m-2 p-button-success" />
            <Button label="Sign Up" onClick={() => window.location.href = 'http://localhost:8080/auth/realms/appnetwise01/protocol/openid-connect/registrations'} className="m-2 p-button-info" />
          </div>
        </div>
      ) : (
        // Keycloak Authenticated Section
        <div className="grid">
          <div className="col-12">
            <h1>My Secured React App</h1>
          </div>
          <div className='grid'>
            <div className='col-2'>
              <div className="col">
                <Button onClick={() => setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE')}
                  className="m-1 custom-btn-style" label='Is Authenticated' />
                <Button onClick={() => kc.login()} className='m-1 custom-btn-style' label='Login' severity="success" />
                <Button onClick={() => setInfoMessage(kc.token)} className="m-1 custom-btn-style" label='Show Access Token' severity="info" />
                <Button onClick={() => setInfoMessage(JSON.stringify(kc.tokenParsed))} className="m-1 custom-btn-style" label='Show Parsed Access token' severity="warning" />
                <Button onClick={() => setInfoMessage(kc.isTokenExpired(5).toString())} className="m-1 custom-btn-style" label='Check Token expired' severity="info" />
                <Button onClick={() => kc.updateToken(10).then(refreshed => setInfoMessage('Token Refreshed: ' + refreshed.toString()), () => setInfoMessage('Refresh Error'))} className="m-1 custom-btn-style" label='Update Token (if about to expire)' />
                <Button onClick={callBackend} className='m-1 custom-btn-style' label='Send HTTP Request' severity="success" />
                <Button onClick={() => kc.logout({ redirectUri: 'http://localhost:3000/' })} className="m-1 custom-btn-style" label='Logout' severity="danger" />
                <Button onClick={() => setInfoMessage(kc.hasRealmRole('admin').toString())} className="m-1 custom-btn-style" label='Has Realm Role "Admin"' severity="info" />
                <Button onClick={() => setInfoMessage(kc.hasResourceRole('test').toString())} className="m-1 custom-btn-style" label='Has Client Role "test"' severity="info" />
              </div>
            </div>
            <div className='col-6'>
              <p id='infoPanel'>{infoMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
