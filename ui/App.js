import React, { useState } from 'react';
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import ViewTable from './example/ViewTable'
import ApiService from './ApiService'
import AuthenticationService from './auth/AuthenticationService'
import logo from './logo.svg';
import './App.css';

const apiService = new ApiService() 
const authService = new AuthenticationService(apiService) 

const headers = ['ID', 'Name', '']

function App() {
  let [isAuthenticated, setAuthenticated] = useState(false)

  function onAuthenticated (authState) {
    setAuthenticated(true)
  }

  function authButton () {
    return (isAuthenticated)
      ? <LogoutButton service={authService} finalizeHook={() => setAuthenticated(false)} />
      : <LoginButton service={authService} finalizeHook={onAuthenticated} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {authButton()}
        {isAuthenticated &&
          <ViewTable service={authService} headers={headers} />
        }
      </header>
    </div>
  );
}

export default App;
