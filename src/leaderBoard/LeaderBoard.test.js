// LeaderBoard.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import { LeaderBoard } from '../leaderBoard/LeaderBoard.js';
import renderer from 'react-test-renderer';

test('LeaderBoard renders', () => {

  const div = document.createElement('div');

  ReactDOM.render(<LeaderBoard />, div);
  ReactDOM.unmountComponentAtNode(div);

  // snapshot test
  const tree = renderer
    .create(<LeaderBoard />,)
    .toJSON();

    expect(tree).toMatchSnapshot();
});
