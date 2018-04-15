// QuestionDetail.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import { QuestionDetail } from '../questions/QuestionDetail.js';
import renderer from 'react-test-renderer';

test('Question renders', () => {

  const mockFetchQuestions = jest.fn();
  const mockUpdateAnswer = jest.fn();
  const mockMatch = {
    params: {
      question_id: 'id000'
    }
  }
  const mockLogin = {}
  const mockQuestions = {}
  const mockUserDictionary = {}

  const div = document.createElement('div');
  ReactDOM.render(<QuestionDetail fetchQuestions={mockFetchQuestions}
      updateAnswer={mockUpdateAnswer} match={mockMatch} login={mockLogin}
      questions={mockQuestions} userDictionary={mockUserDictionary} />, div);
  ReactDOM.unmountComponentAtNode(div);

  // snapshot test
  const tree = renderer
    .create(<QuestionDetail fetchQuestions={mockFetchQuestions}
      updateAnswer={mockUpdateAnswer} match={mockMatch} login={mockLogin}
      questions={mockQuestions} userDictionary={mockUserDictionary} />,)
    .toJSON();

    expect(tree).toMatchSnapshot();
});
