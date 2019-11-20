import React, { useState } from 'react';
import LoginButton from './auth/LoginButton'
import ApiService from './ApiService'
import AuthenticationService from './auth/AuthenticationService'
import logo from './logo.svg';
import './App.css';

const apiService = new ApiService() 
const authService = new AuthenticationService(apiService) 

function App() {
  let [state, setState] = useState([])

  async function callService () {
    authService
      .callWithAuth({ endpoint: 'options' })
      .then(res => setState(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      <LoginButton Service={authService} />
      <button onClick={callService}>Click Here</button>
      {state.map(x => <div>{x}</div>)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
