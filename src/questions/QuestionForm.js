import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { saveQuestion } from '../questions/questionsActions';

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: '',
      optionTwo: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange);
  }

  onSubmit(ev, loggedInId) {
    ev.preventDefault();
    let form = document.querySelector('.question-form')
    let question;
    let optionOneText = this.state.optionOne;
    let optionTwoText = this.state.optionTwo;
    let author = loggedInId;

    question = {optionOneText, optionTwoText, author}
    this.props.dispatch(saveQuestion(question));
  }

  render() {
    const {login} = this.props;
    let isLoggedIn;
    let loggedInId;

    if (login && login.isLoggedIn) {
      isLoggedIn = login.isLoggedIn;
      loggedInId = login.loggedInId;
    }

    return (
      <div className="">
        <h2>Would You Rather</h2>

        {isLoggedIn && (
          <form className="question-form">
            <label>Option 1
              <input type="text" className="" name="optionOne" onChange={this.onChange} />
            </label>
            <label>Option 2
              <input type="text" className="" name="optionTwo" onChange={this.onChange} />
            </label>
            <button value="save" onClick={(ev) => this.onSubmit(ev, loggedInId)}>Save</button>
          </form>
        )}

        {!isLoggedIn && (
          <div>Sorry, you need to log in to add a question.</div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ login }) {
  return {
    login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveQuestion }, dispatch);
}

export default connect(mapStateToProps)(QuestionForm);
