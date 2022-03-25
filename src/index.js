import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {UserAuthContextProvider} from "./config/auth"

// Import CSS here
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.css"




ReactDOM.render(
  <React.StrictMode>
    <UserAuthContextProvider>
    <App />
    </UserAuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);