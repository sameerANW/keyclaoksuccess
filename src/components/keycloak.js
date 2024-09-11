import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/', // Replace with your Keycloak URL
  realm: 'appnetwise01', // Replace with your Keycloak realm
  clientId: 'frontend-client', // Replace with your Keycloak client ID
});

export default keycloak;
