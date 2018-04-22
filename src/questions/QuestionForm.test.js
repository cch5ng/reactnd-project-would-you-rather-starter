// QuestionForm.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import { QuestionForm } from '../questions/QuestionForm.js';
import renderer from 'react-test-renderer';

test('Form renders', () => {

  const div = document.createElement('div');
  ReactDOM.render(<QuestionForm />, div);
  ReactDOM.unmountComponentAtNode(div);

  // snapshot test
  const tree = renderer
    .create(<QuestionForm />,)
    .toJSON();

    expect(tree).toMatchSnapshot();
});