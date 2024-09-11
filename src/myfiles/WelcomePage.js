import React from 'react';

const WelcomePage = ({ username }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default WelcomePage;
