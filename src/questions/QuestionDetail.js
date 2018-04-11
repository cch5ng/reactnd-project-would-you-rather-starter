import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
//import logo from '../logo.svg';
import { fetchQuestions } from '../questions/questionsActions';

class QuestionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onClickHandler = this.onClickHandler.bind(this);
    this.getPercentVoted = this.getPercentVoted.bind(this);

  }

  componentDidMount() {
    // making BE request to support user entering the url manually into browser
    this.props.dispatch(fetchQuestions());
  }

  onClickHandler(ev) {
    console.log('gets here')
    let value = ev.target.value;
    let stateChange = {};

    stateChange[ev.target.name] = value;
    this.setState(stateChange);
  }

  getPercentVoted(numVotes, totalUsers) {
    return numVotes / totalUsers * 100;
  }


  // getUnansweredQuestions(userAnswers, allQuestions) {
  //   let unansweredQuestions;
  //   let answeredSet;
  //   if (userAnswers) {
  //     answeredSet = new Set(Object.keys(userAnswers));
  //   }
  //   let allQuestionsSet;
  //   if (allQuestions) {
  //     allQuestionsSet = new Set(Object.keys(allQuestions));
  //   }

  //   if (allQuestionsSet && answeredSet) {
  //     unansweredQuestions = [...allQuestionsSet].filter(qid => !answeredSet.has(qid))
  //   }

  //   return unansweredQuestions;
  // }

  // prettyQuestion(qid, questionsDict) {
  //     console.log('qid : ' + qid);
  //     console.log('questionsDict : ' + JSON.stringify(questionsDict));
  //   if (questionsDict && qid) {
  //     let option1 = questionsDict[qid]['optionOne']['text'];
  //     let option2 = questionsDict[qid]['optionTwo']['text'];
  //     return `${option1} OR ${option2}?`
  //   }
  //   return
  // }

  // sortQuestionObjects(questionsDict) {
  //   let questionObjects = [];

  //   questionObjects = (Object.keys(questionsDict)).map(id => questionsDict[id]);
  //   questionObjects.sort((a, b) => {
  //     return b.timestamp - a.timestamp;
  //   })

  //   return questionObjects;
  // }

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

    if (login && login.isLoggedIn) {
      isLoggedIn = login.isLoggedIn;
      loggedInId = login.loggedInId;
      console.log('loggedInId: ' + loggedInId);
    }

    if (questions && questions.questions) {
      console.log('questions: ' + JSON.stringify(questions));
      question = questions.questions[qid];
      console.log('question: ' + JSON.stringify(question));
      if (question) {
        option1Text = question['optionOne']['text'];
        option1Votes = question['optionOne']['votes'].length;
        option1VotePercent = this.getPercentVoted(option1Votes, totalUsers);
        option2Text = question['optionTwo']['text'];
        option2Votes = question['optionTwo']['votes'].length;
        option2VotePercent = this.getPercentVoted(option2Votes, totalUsers);
        let authorId = question['author']
        if (userDictionary[authorId]) {
          avatarUrl = userDictionary[authorId]['avatarURL']; //['avatarURL'];
          console.log('avatarUrl: ' + JSON.stringify(avatarUrl));
        }
      }
    }

    if (isLoggedIn && question) {
      let userAnsweredQuestions = Object.keys(userDictionary[loggedInId]['answers']);
      if (userAnsweredQuestions.indexOf(qid) > -1) {
        questionAnswered = true;
      }
    }

    // need filter questions obj for the cur qid
    // TODO fix

    return (
      <div className="">
        <h1>Would You Rather?</h1>
        {isLoggedIn && questionAnswered && (
          <div>
            <p><img src={avatarUrl} alt="user avatar" /></p>
            <div>
              <p>1: {option1Text}</p>
              <p>votes: {option1Votes}</p>
              <p>percent who voted: {option1VotePercent}(% of all users)</p>
            </div>
            <div>
              <p>2: {option2Text}</p>
              <p>votes: {option2Votes}</p>
              <p>percent who voted: {option2VotePercent}(% of all users)</p>
            </div>
          </div>
        )}

        {isLoggedIn && !questionAnswered && (
          <div>
            <p><img src={avatarUrl} alt="user avatar" /></p>
            <p>1: {option1Text}</p>
            <p>2: {option2Text}</p>
          </div>
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

export default connect(mapStateToProps)(QuestionDetail);
