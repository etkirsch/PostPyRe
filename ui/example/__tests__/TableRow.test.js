import React from 'react';
import ReactDOM from 'react-dom';
import ViewTable from '../ViewTable';

const headers = [
  { text: 'ID', style: { width: '15%' }},
  { text: 'Name', style: { width: '65%' }},
  { text: '', style: { width: '20%' }}
]

class MockApiService {
  constructor () {
    this.calls = []
  }

  async call (options) {
    this.calls.push(options)
    return async () => JSON.stringify([ { id: '0', name: 'asdf' } ])
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  const service = new MockApiService()
  ReactDOM.render(<ViewTable service={service} headers={headers}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
