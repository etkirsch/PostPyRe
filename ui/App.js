import React, { useState } from 'react';
import ExampleTable from './example'
import ApiService from './ApiService'
import Auth0Row from './auth/AuthenticationRow'
import AuthenticationService from './auth/AuthenticationService'
import './App.scss';

const apiService = new ApiService() 
const authService = new AuthenticationService(apiService) 
authService.restoreExistingState()

const headers = [
  { text: 'ID', style: { width: '15%' }},
  { text: 'Name', style: { width: '65%' }},
  { text: '', style: { width: '20%' }}
]

function App() {
  let [isAuthenticated, setAuthenticated] = useState(authService.hasValidState())

  function onAuthStateChange (authState) {
    setAuthenticated(!!authState)
  }

  function renderBlurb () {
    return 'Log in via Auth0 to see a simple example or start modifying the source yourself!'
  }

  return (
    <div className="App">
      <div className='main'>
        <Auth0Row onAuthStateChange={onAuthStateChange} service={authService} />
        <header className="App-header">
          <h1>PostPyRe</h1>
          <h4>A minimal Python/Flask, PostgreSQL, and React Hooks Stack</h4>
        </header>
        <div>
          {isAuthenticated
            ? <ExampleTable service={authService} headers={headers} />
            : <p>{renderBlurb()}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
