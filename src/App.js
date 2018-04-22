import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { receiveLogin, receiveLogout } from './login/loginActions';
import { fetchUsers } from './users/usersActions';
import { fetchQuestions } from './questions/questionsActions';
import Questions from './questions/Questions';
import QuestionDetail from './questions/QuestionDetail';
import QuestionForm from './questions/QuestionForm';
import LeaderBoard from './leaderBoard/LeaderBoard';
import Error from './Error';
import { getArFromDict } from './utilities/utilities';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: '',
      isLoggedIn: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchQuestions();
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function() {
      if (this.state.loginUser.length) {
        // change state to logged in
        this.props.receiveLogin(this.state.loginUser);
      }
    });
  }

  logout(ev) {
    this.setState({loginUser: ''});
    this.props.receiveLogout();
  }

  render() {
    let isLoggedIn;
    let userDictionary;
    let curUserId;
    let curUser;
    let userAr;
    let questionDictionary;
    let userAnswers;
    let userQuestions;

    if (this.props.users && this.props.users.users) {
      userDictionary = this.props.users.users;
      userAr = getArFromDict(userDictionary);
    }

    // if user logged in, get user name and user questions
    if (this.props.login) {
      isLoggedIn = this.props.login['isLoggedIn'];
      if (isLoggedIn) {
        let loggedInUid = this.state['loginUser'];
        if (userDictionary) {
          curUser = userDictionary[loggedInUid]['name'];
        }
        if (this.props.questions && this.props.questions.questions) {
          questionDictionary = this.props.questions.questions;
          userAnswers = userDictionary[loggedInUid]['answers'];
          userQuestions = userDictionary[loggedInUid]['questions'];
        }
      }
    }

    return (
      <Router>
        <div className="App">
          <header className="header title">
            <div className="header-main">
              <h2><Link to="/" className="header-main">Would You Rather</Link></h2>
            </div>
            <div className="header-contact">
              <p className="contact">
                <Link to="/">Questions</Link>
                <Link to="/add">New Question</Link>
                <Link to="/leaderboard">Leader Board</Link>
              </p>
              {isLoggedIn === false && (
                <select value={this.state.loginUser} onChange={this.onChangeHandler} name="loginUser">
                  <option value="">Login</option>
                  {userAr.map(user => {
                    return (<option value={user["id"]} key={user["id"]}>{user["name"]}</option>)
                  })}
                </select>
              )}
              {isLoggedIn === true && (
                <Link to="/" onClick={this.logout} >Logout {curUser}</Link>
              )}
            </div>
          </header>

          <main>
            <Route exact path="/" render={() => (
                <Questions isLoggedIn={isLoggedIn} 
                  userQuestions={userQuestions} 
                  userAnswers={userAnswers}
                  questions={questionDictionary}
                />
              )}
            />
            <Route exact path="/questions/:question_id" render={({match}) => (
                <QuestionDetail match={match} userDictionary={userDictionary} />
              )}
            />
            <Route exact path="/add" render={() => (
                <QuestionForm />
              )}
            />
            <Route exact path="/leaderboard" render={() => (
                <LeaderBoard />
              )}
            />
            <Route exact path="/404" render={() => (
                <Error />
              )}
            />
          </main>

          <footer>Link to source
          </footer>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ login, users, questions }) {
  return {
    login,
    users,
    questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    fetchQuestions,
    receiveLogin,
    receiveLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
