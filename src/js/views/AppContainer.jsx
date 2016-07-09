import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="banner">
          <div className="container nav-container">
            <nav className="navbar navbar-light">
              <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to="/">
                  <img className="logo" src={require('img/nusmods-logo-gradient.png')}/>
                  <span className="site-title">&nbsp;&nbsp; Hall of Fame</span>
                  <div><em>Awards Search</em></div>
                </Link>
              </div>
              <div className="nav navbar-nav pull-xs-right">
                <Link className="nav-item nav-link" to="/business">Business</Link>
                <Link className="nav-item nav-link" to="/computing">Computing</Link>
                <Link className="nav-item nav-link" to="/engineering">Engineering</Link>
              </div>
            </nav>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
