// QuestionForm.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import { QuestionForm } from '../questions/QuestionForm.js';
import renderer from 'react-test-renderer';

test('Form renders', () => {
  const store = {
    login: {
      login: {
        isLoggedIn: true,
        loggedInId: "sarahedo",
      }
    }
  }

  const div = document.createElement('div');
  ReactDOM.render(<QuestionForm />, div);
  ReactDOM.unmountComponentAtNode(div);

  // const component = renderer.create(
  //   <QuestionForm />,
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});