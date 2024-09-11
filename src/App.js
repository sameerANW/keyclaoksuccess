// src/App.js
import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';
import SignIn from './components/SignIn';
import AuthButtons from './components/AuthButtons';

function App() {
  const [showKeycloakUI, setShowKeycloakUI] = useState(false);

  return (
    <div className="App">
      {!showKeycloakUI ? (
        <SignIn setShowKeycloakUI={setShowKeycloakUI} />
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}

export default App;
