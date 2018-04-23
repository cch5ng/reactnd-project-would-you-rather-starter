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
          <nav className="navbar navbar-expand-lg navbar-light bg-blue">
            <Link to="/" className="navbar-brand header-main">WOULD YOU RATHER</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Questions</Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">New Question</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">Leader Board</Link>
                </li>

                {isLoggedIn === false && (
                  <li className="nav-item">
                    <select value={this.state.loginUser} 
                      onChange={this.onChangeHandler} name="loginUser"
                      className="select-login">

                      <option value="">Login</option>
                      {userAr.map(user => {
                        return (<option value={user["id"]} key={user["id"]}>{user["name"]}</option>)
                      })}
                    </select>
                  </li>
                )}

                {isLoggedIn === true && (
                  <li className="nav-item">
                    <Link to="/" onClick={this.logout} className="nav-link">Logout {curUser}</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>


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

          <footer className="footer">
            <div className="container">
              <span className="text-muted">Place sticky footer content here.</span>
            </div>
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
