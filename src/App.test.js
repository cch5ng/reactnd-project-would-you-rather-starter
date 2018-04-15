import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App } from './App';

const mockReceiveLogin = jest.fn();
const mockReceiveLogout = jest.fn();
const mockFetchUsers = jest.fn();
const mockFetchQuestions = jest.fn();

it('renders without crashing', () => {
  let wrapper;
  const div = document.createElement('div');

  ReactDOM.render(<App receiveLogin={mockReceiveLogin} receiveLogout={mockReceiveLogout}
    fetchUsers={mockFetchUsers} fetchQuestions={mockFetchQuestions} 
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App renders', () => {
  // snapshot test
  const tree = renderer
    .create(<App receiveLogin={mockReceiveLogin} receiveLogout={mockReceiveLogout}
        fetchUsers={mockFetchUsers} fetchQuestions={mockFetchQuestions}
      />,)
    .toJSON();

    expect(tree).toMatchSnapshot();
});
