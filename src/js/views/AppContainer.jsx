import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
