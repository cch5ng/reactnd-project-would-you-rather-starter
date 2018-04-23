import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getArFromDict, sortByAnswersCount } from '../utilities/utilities';

export class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {login, users} = this.props;
    let isLoggedIn;
    let usersAr;

    if (login && login.isLoggedIn) {
      isLoggedIn = login.isLoggedIn;
    }

    if (users && users.users) {
      usersAr = getArFromDict(users.users)
      usersAr = sortByAnswersCount(usersAr);
      console.log('usersAr: ' + JSON.stringify(usersAr));
    }

    return (
      <div className="">
        <h1>Leader Board</h1>
        <div className="spacer-sm"></div>
        <div className="row row-circle">
          {isLoggedIn && (
            usersAr.map(user => {
              let numQuestionsAnswered = Object.keys(user.answers).length;

              return (
                <div key={user.id} className="leader-circle">
                  <h2>{user.name}</h2>
                  <p><img src={user.avatarURL} alt="user avatar" className="avatar" /></p>
                  <p>{numQuestionsAnswered} Questions answered</p>
                  <p>{user.questions.length} Questions asked</p>
                </div>
              )
            })
          )}
        </div>

        {!isLoggedIn && (
          <div>Sorry, you need to log in to view this page.</div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ login, users }) {
  return {
    login,
    users,
  }
}

export default connect(mapStateToProps)(LeaderBoard);
