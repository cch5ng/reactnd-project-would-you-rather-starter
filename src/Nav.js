import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';

/*

          <header className="App-header">
            <h1 className="App-title">Would You Rather</h1>
            <p>login select list</p>
          </header>

*/

class Nav extends Component {

  render() {
    //const post = this.props.post
    return (
      <div className="header title">
        <div className="header-main">
          <h2><Link to="/" className="header-main">Would You Rather</Link></h2>
        </div>
        <div className="header-contact">
          <p className="contact">
            <Link to="/">Questions</Link>
            <Link to="/leaderboard">Leader Board</Link>
            <p>User-name and Logout</p>
            <p>Select list for user names</p>

          </p>
        </div>


      </div>
    )
  }
}

export default Nav;
