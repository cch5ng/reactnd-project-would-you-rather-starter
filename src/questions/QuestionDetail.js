import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { fetchQuestions, updateAnswer } from '../questions/questionsActions';
import { getPercentVoted } from '../utilities/utilities';


export class QuestionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    // making BE request to support user entering the url manually into browser
    this.props.fetchQuestions();
  }

  onClickHandler(uid, qid, answer) {
    console.log('answer: ' + answer);
    this.props.updateAnswer(uid, qid, answer);
  }

  render() {
    const {login, questions, match, userDictionary} = this.props;
    const qid = match.params.question_id;
    let isLoggedIn;
    let loggedInId;
    let question;
    let questionAnswered = false;
    let totalUsers = Object.keys(userDictionary).length;
    let option1Text;
    let option1Votes;
    let option1VotePercent;
    let option2Text;
    let option2Votes;
    let option2VotePercent;
    let avatarUrl = '';
    let userAnswer;
    let questionClass1 = 'question-answered'
    let questionClass2 = 'question-answered'

    if (login && login.isLoggedIn) {
      isLoggedIn = login.isLoggedIn;
      loggedInId = login.loggedInId;
    }

    if (questions && questions.questions) {
      question = questions.questions[qid];
      if (question) {
        option1Text = question['optionOne']['text'];
        option1Votes = question['optionOne']['votes'].length;
        option1VotePercent = getPercentVoted(option1Votes, totalUsers);
        option2Text = question['optionTwo']['text'];
        option2Votes = question['optionTwo']['votes'].length;
        option2VotePercent = getPercentVoted(option2Votes, totalUsers);
        let authorId = question['author']
        if (userDictionary[authorId]) {
          avatarUrl = userDictionary[authorId]['avatarURL'];
        }
      }
    }

    if (isLoggedIn && question) {
      let userAnsweredQuestions = Object.keys(userDictionary[loggedInId]['answers']);
      if (userAnsweredQuestions.indexOf(qid) > -1) {
        questionAnswered = true;
      }
      userAnswer = userDictionary[loggedInId]['answers'][qid];
      console.log('userAnswer: ' + userAnswer)
      if (userAnswer === 'optionOne') {
        questionClass1 = "question-answered user-selected"
      }
      if (userAnswer === 'optionTwo') {
        questionClass2 = "question-answered user-selected"
      }
    }

    return (
      <div className="">
        {isLoggedIn && questionAnswered && (
          <div>
            <h1>Users Answered</h1>
            <p><img src={avatarUrl} alt="user avatar" className="avatar" /></p>
            <div className="row">
              <div className={questionClass1}>
                <p>1: {option1Text}</p>
                <div className="row row-circle">
                  <div className="vote-circle">{option1Votes} votes</div>
                  <div className="vote-circle">{option1VotePercent} % voted</div>
                </div>
              </div>
              <div className={questionClass2}>
                <p>2: {option2Text}</p>
                <div className="row row-circle">
                  <div className="vote-circle">{option2Votes} votes</div>
                  <div className="vote-circle">{option2VotePercent} % voted</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn && !questionAnswered && (
          <div>
            <h1><img src={avatarUrl} alt="user avatar" className="avatar" /> Would You Rather?</h1>
            <div className="row">
              <p id="optionOne" className="option" onClick={(ev) => this.onClickHandler(loggedInId, qid, ev.target.id)}>1: {option1Text}</p>
              <p id="optionTwo" className="option" onClick={(ev) => this.onClickHandler(loggedInId, qid, ev.target.id)}>2: {option2Text}</p>
            </div>
          </div>
        )}

        {isLoggedIn && !question && (
          <Redirect to="/404" />
        )}

        {!isLoggedIn && (
          <div>Sorry, you need to log in to view this question.</div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ login, questions }) {
  return {
    login,
    questions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchQuestions, updateAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
