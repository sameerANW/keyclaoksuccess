import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';
import { Button } from 'primereact/button';
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
 
        // Set the authorization header for httpClient if needed
        // httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
 
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
 
  const handleSignUp = () => {
    const redirectUri = window.location.origin + '/welcome';
    kc.register({ redirectUri });
  };

  return (
    <div className="App">
      {!showKeycloakUI ? (
        // The landing page with Sign In and Sign Up buttons
        <div className="grid">
          <div className="col-12">
            <h1>Welcome to My Secured App</h1>
            <Button label="Sign In" onClick={handleSignIn} className="m-2 p-button-success" />
            <Button label="Sign Up" onClick={handleSignUp} className="m-2 p-button-success" />
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
               
                <Button onClick={() => kc.logout({ redirectUri: 'http://localhost:3000/' })} className="m-1 custom-btn-style" label='Logout' severity="danger" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default App;