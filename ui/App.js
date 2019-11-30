import React, { useState } from 'react';
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import ViewTable from './example/ViewTable'
import ApiService from './ApiService'
import AuthenticationService from './auth/AuthenticationService'
import './App.css';

const apiService = new ApiService() 
const authService = new AuthenticationService(apiService) 
authService.restoreExistingState()

const headers = ['ID', 'Name', '']

function App() {
  let [isAuthenticated, setAuthenticated] = useState(authService.hasValidState())

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
      <div className='main'>
        <header className="App-header">
          <h1>PostPyRe</h1>
          <h4>A minimal Python/Flask, PostgreSQL, and React Hooks Stack</h4>
        </header>
        <div>
          {authButton()}
          {isAuthenticated &&
            <ViewTable service={authService} headers={headers} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
