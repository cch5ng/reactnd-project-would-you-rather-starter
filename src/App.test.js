import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  let wrapper;
  const mockReceiveLogin = jest.fn();
  const mockReceiveLogout = jest.fn();
  const mockFetchUsers = jest.fn();
  const mockFetchQuestions = jest.fn();
  const div = document.createElement('div');

  ReactDOM.render(<App receiveLogin={mockReceiveLogin} receiveLogout={mockReceiveLogout}
    fetchUsers={mockFetchUsers} fetchQuestions={mockFetchQuestions} 
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
