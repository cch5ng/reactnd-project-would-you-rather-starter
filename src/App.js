import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { receiveLogin, receiveLogout } from './login/loginActions';
import { fetchUsers } from './users/usersActions';
import { fetchQuestions } from './questions/questionsActions';
import Questions from './questions/Questions';
import QuestionDetail from './questions/QuestionDetail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: '',
      isLoggedIn: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.makeArrayFromDictionary = this.makeArrayFromDictionary.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchQuestions());
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function() {
      if (this.state.loginUser.length) {
        // change state to logged in
        console.log('user is logged in');
        this.props.dispatch(receiveLogin(this.state.loginUser));
      }
    });
  }

  logout(ev) {
    console.log('clicked logout');
    this.setState({loginUser: ''});
    this.props.dispatch(receiveLogout());
  }

  // getUserDictionary() {
  //   return {'sarahedo': 'Sarah Edo',
  //           'tylermcginnis': 'Tyler McGinnis',
  //           'johndoe': 'John Doe'
  //          }
  // }

  makeArrayFromDictionary(dict) {
    return Object.keys(dict).map(uid => dict[uid]);
  }

/*


          <Route exact path="/" render={() => (
              <Questions />
            )}
          />


          <Route exact path="/add" render={() => (
              <Questions />
            )}
          />

          <Route exact path="/leaderboard" render={() => (
              <Questions />
            )}
          />

*/

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
      userAr = this.makeArrayFromDictionary(userDictionary);
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
          console.log('questionDictionary: ' + JSON.stringify(questionDictionary));
          userAnswers = userDictionary[loggedInUid]['answers'];
          userQuestions = userDictionary[loggedInUid]['questions'];

          console.log('userAnswers: ' + JSON.stringify(userAnswers));

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
            <Route exact path="/leaderboard" render={() => (
                <div>test data</div>
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

export default connect(mapStateToProps)(App);
