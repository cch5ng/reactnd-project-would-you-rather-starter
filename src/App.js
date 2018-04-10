import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { receiveLogin, receiveLogout } from './login/loginActions';
//import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: '',
      isLoggedIn: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
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
    if (this.props.login) {
      console.log('login: ' + JSON.stringify(this.props.login));
      isLoggedIn = this.props.login['isLoggedIn'];
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
                <span>User-name and Logout</span>
                <span>Select list for user names</span>
              </p>
              {isLoggedIn === false && (
                <select value={this.state.loginUser} onChange={this.onChangeHandler} name="loginUser">
                  <option value="">Login</option>
                  <option value="sarahedo">Sarah Edo</option>
                  <option value="tylermcginnis">Tyler McGinnis</option>
                  <option value="johndoe">John Doe</option>
                </select>
              )}
              {isLoggedIn === true && (
                <Link to="/" onClick={this.logout} >Logout</Link>
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

function mapStateToProps({ login }) {
  return {
    login,
  }
}

export default connect(mapStateToProps)(App);

//export default App;
