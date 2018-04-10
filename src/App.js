import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { receiveLogin, receiveLogout } from './login/loginActions';
import { fetchUsers } from './users/usersActions';
// import { _getUsers } from './_DATA'
// import Nav from './Nav';

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
  }

  onChangeHandler(ev) {
    let value = ev.target.value;
    let stateChange = {};
    stateChange[ev.target.name] = value;
    this.setState(stateChange, function() {
      if (this.state.loginUser.length) {
        // change state to logged in
        console.log('user is logged in');
        this.props.dispatch(receiveLogin());
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

          <Route exact path="/questions/:question_id" render={() => (
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
    let curUser;
    let userAr;
    if (this.props.users && this.props.users.users) {
      userDictionary = this.props.users.users;
      userAr = this.makeArrayFromDictionary(userDictionary);
    }
    if (this.props.login) {
      isLoggedIn = this.props.login['isLoggedIn'];
      if (isLoggedIn) {
        let loggedInUid = this.state['loginUser'];
        if (userDictionary) {
          curUser = userDictionary[loggedInUid]['name'];
        }
      }
    }

    return (
      <Router>
        <div className="App">
          <div className="header title">
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
          </div>

          <main>
            <li>would you rather questions</li>
          </main>

          <footer>Link to source
          </footer>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ login, users }) {
  return {
    login,
    users
  }
}

export default connect(mapStateToProps)(App);
