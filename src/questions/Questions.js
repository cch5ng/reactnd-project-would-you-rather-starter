import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getArFromDict, sortByPropertyDesc, getPrettyQuestion } from '../utilities/utilities';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionType: "unanswered",
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.getUnansweredQuestions = this.getUnansweredQuestions.bind(this);
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};

    stateChange[ev.target.name] = value;
    this.setState(stateChange);
  }

  getUnansweredQuestions(userAnswers, allQuestions) {
    let unansweredQuestions;
    let answeredSet;
    if (userAnswers) {
      answeredSet = new Set(Object.keys(userAnswers));
    }
    let allQuestionsSet;
    if (allQuestions) {
      allQuestionsSet = new Set(Object.keys(allQuestions));
    }

    if (allQuestionsSet && answeredSet) {
      unansweredQuestions = [...allQuestionsSet].filter(qid => !answeredSet.has(qid))
    }

    return unansweredQuestions;
  }

  render() {
    const {userQuestions, userAnswers, isLoggedIn, questions} = this.props;
    let questionsArSorted;
    let questionsAr;

    // REFACTOR revisit all the if logic; are they necessary?
    if (questions) {
      questionsAr = getArFromDict(questions);
      questionsArSorted = sortByPropertyDesc(questionsAr, 'timestamp');
    }
    // list of question id's
    let questionsDisplay = [];
    let questionsDisplaySorted = [];
    let questionsDisplayObjectsSorted = [];

    // filter for unanswered questions
    if (userAnswers && questions && this.state.questionType === "unanswered") {
      questionsDisplay = this.getUnansweredQuestions(userAnswers, questions);
    }

    // filter for answered questions
    if (userAnswers && questions && this.state.questionType === "answered") {
      questionsDisplay = Object.keys(userAnswers);
    }

    // TODO 041018 sort the ar questionsDisplay using questionsArSorted
    if (questionsDisplay && questionsArSorted) {
      let qidRecentToOld = questionsArSorted.map(obj => obj['id']);
      qidRecentToOld.forEach(qid => {
        if (questionsDisplay.indexOf(qid) > -1) {
          questionsDisplaySorted.push(qid)
        }
      })
      questionsDisplay = questionsDisplaySorted;
    }

    return (
      <div className="">
        <h1>Questions</h1>
        {isLoggedIn && (
          <div>
            <label>Filter by questions 
              <select value={this.state.loginUser} onChange={this.onChangeHandler} name="questionType">
                <option value="unanswered">Unanswered</option>
                <option value="answered">Answered</option>
              </select>
               by this user
            </label>

            <hr />

            {questionsDisplay.map(qid => {
              let prettyQuestion = getPrettyQuestion(qid, questions);
              let link = `/questions/${qid}`
              return (
                <div key={qid}>
                  <h1><Link to={link} className="question-list">Would You Rather: {prettyQuestion}</Link></h1>
                </div>
              )
            })}
          </div>
        )}

        {!isLoggedIn && (
          <div>Sorry, you need to log in to view questions.</div>
        )}

      </div>
    )
  }
}

export default Questions;
