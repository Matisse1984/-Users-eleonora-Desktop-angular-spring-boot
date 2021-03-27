const oktaConfig = {
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    redirectUri: window.location.origin + '/callback',
    clientId: '{yourClientId}',
    pkce: true
  };