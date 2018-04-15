// Questions.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import Questions from '../questions/Questions.js';
import renderer from 'react-test-renderer';

test('Questions list renders', () => {

  const mockIsLoggedIn = true;
  const mockUserQuestions = {}
  const mockUserAnswers = {}
  const mockQuestions = {}
  const div = document.createElement('div');

  ReactDOM.render(<Questions isLoggedIn={mockIsLoggedIn} 
    userQuestions={mockUserQuestions} 
    userAnswers={mockUserAnswers} questions={mockQuestions} />, div);
  ReactDOM.unmountComponentAtNode(div);

  // snapshot test
  const tree = renderer
    .create(<Questions isLoggedIn={mockIsLoggedIn}
      userQuestions={mockUserQuestions} 
      userAnswers={mockUserAnswers} questions={mockQuestions} />,)
    .toJSON();

    expect(tree).toMatchSnapshot();
});
