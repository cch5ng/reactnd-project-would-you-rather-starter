import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';

class LeaderBoard extends Component {
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
      usersAr = Object.keys(users.users).map(uid => users.users[uid]);
      usersAr.sort((a, b) => {
        let bNumAnswers = Object.keys(b.answers).length;
        let aNumAnswers = Object.keys(a.answers).length;
        return bNumAnswers - aNumAnswers;
      });

    }

    return (
      <div className="">
        <h2>Leader Board</h2>

        {isLoggedIn && (
          usersAr.map(user => {
            let numQuestionsAnswered = Object.keys(user.answers).length;

            return (
              <div key={user.id}>
                <p>{user.name}</p>
                <p><img src={user.avatarURL} alt="user avatar" /></p>
                <p># Questions answered: {numQuestionsAnswered}</p>
                <p># Questions asked: {user.questions.length}</p>
              </div>
            )
          })
        )}

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
