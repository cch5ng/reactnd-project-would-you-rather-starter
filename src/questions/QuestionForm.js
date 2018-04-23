import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css';
import { saveQuestion } from '../questions/questionsActions';

export class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOne: '',
      optionTwo: '',
      pollSubmitted: false
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
    this.props.saveQuestion(question);
    form.reset();
    this.setState({pollSubmitted: true})
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
        <h1>Add a Question</h1>

        {isLoggedIn && (
          <form className="question-form">
            <input type="text" className="input-text" name="optionOne" onChange={this.onChange} 
              placeholder="Option 1"
            />
            <br />
            <input type="text" className="input-text" name="optionTwo" onChange={this.onChange}
              placeholder="Option 2"
            />
            <br />
            <button value="save" onClick={(ev) => this.onSubmit(ev, loggedInId)}>Save</button>
          </form>
        )}

        {!isLoggedIn && (
          <div>Sorry, you need to log in to add a question.</div>
        )}

        {this.state.pollSubmitted && (
          <Redirect to="/" />
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
