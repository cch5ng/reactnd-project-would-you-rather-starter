import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { fetchQuestions } from '../questions/questionsActions';

class QuestionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    // this.onChangeHandler = this.onChangeHandler.bind(this);
    //this.getArrayForDict = this.getArrayForDict.bind(this);
    // this.getUnansweredQuestions = this.getUnansweredQuestions.bind(this);
    // this.prettyQuestion = this.prettyQuestion.bind(this);
    // this.sortQuestionObjects = this.sortQuestionObjects.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  onChangeHandler(ev) {
    console.log('gets here')
    let value = ev.target.value;
    let stateChange = {};

    stateChange[ev.target.name] = value;
    this.setState(stateChange);
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
    const {login, questions, match} = this.props;
    const qid = match.params.question_id;

    console.log('this.props: ' + JSON.stringify(this.props));
    console.log('qid: ' + qid);
    // need filter questions obj for the cur qid
    let isLoggedIn;
    // TODO fix
    isLoggedIn = true;

    return (
      <div className="">
        <h1>Questions</h1>
        {isLoggedIn && (
          <div>
                <div key={qid}>
                  <h1>Would You Rather: OPTION 1 OR OPTION 2?</h1>
                </div>
          </div>
        )}

        {!isLoggedIn && (
          <div>Sorry, you need to log in to view this question.</div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ login, users, questions }) {
  return {
    login,
    users,
    questions
  }
}

export default connect(mapStateToProps)(QuestionDetail);
