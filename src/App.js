import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
    return (
      <Router>
        <div className="App">
          <Nav />

          <main>
            <li>would you rather questions</li>

          </main>
          <footer>

          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
