import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain ="webdev.au.auth0.com"
    clientId="xKMrIws9VQILkaD42bQS5JrdP3M2HDSm"
    authorizationParams={{
      audience: "http://localhost:4000/",
    }}  
    redirect_uri = {window.location.origin}
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);
