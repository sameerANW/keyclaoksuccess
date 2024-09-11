// src/components/AuthButtons.js
import React from 'react';
import { Button } from 'primereact/button';
import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/',
  realm: 'appnetwise01',
  clientId: 'frontend-client',
};

const kc = new Keycloak(initOptions);

const AuthButtons = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <h1>My Secured React App</h1>
      </div>
      <div className='grid'>
        <div className='col-2'>
          <div className="col">
            <Button onClick={() => kc.login()} className='m-1 custom-btn-style' label='Login' severity="success" />
            <Button onClick={() => kc.logout({ redirectUri: 'http://localhost:3000/' })} className="m-1 custom-btn-style" label='Logout' severity="danger" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthButtons;
