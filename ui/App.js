import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [state, setState] = useState([])

  async function callService () {
    let options = { method: 'GET' }
    await fetch(`/options`, options)
      .then(res => res.json())
      .then(res => setState(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
