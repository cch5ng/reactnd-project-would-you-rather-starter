import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    // this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className="">
        <h2>404 Error</h2>
        <p>Sorry, that page could not be found.</p>
      </div>
    )
  }
}

export default Error;
