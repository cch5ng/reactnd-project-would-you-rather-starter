import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getArFromDict, sortByPropertyDesc, getPrettyQuestion,
  getUnansweredQuestions } from '../utilities/utilities';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionType: "unanswered",
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};

    stateChange[ev.target.name] = value;
    this.setState(stateChange);
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
      questionsDisplay = getUnansweredQuestions(userAnswers, questions);
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
            <label> 
              <select value={this.state.loginUser} onChange={this.onChangeHandler} name="questionType">
                <option value="unanswered">Unanswered Questions</option>
                <option value="answered">Answered Questions</option>
              </select>
            </label>

            <hr />

            {questionsDisplay.map(qid => {
              let prettyQuestion = getPrettyQuestion(qid, questions);
              let link = `/questions/${qid}`
              return (
                <div key={qid}>
                  <h2><Link to={link} className="question-list">Would You Rather: {prettyQuestion}</Link></h2>
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
