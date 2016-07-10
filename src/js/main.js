import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import AppContainer from 'views/AppContainer';
import NotFoundPage from 'views/NotFoundPage';

import HomePage from 'views/home/HomePage';
import FacultyPage from 'views/faculty/FacultyPage';
import StudentPage from 'views/students/StudentPage';

require('main.scss');

const history = useRouterHistory(createHistory)({
  basename: '/'
});

function routeChange() {
  document.body.scrollTop = 0;
}

ReactDOM.render(
  <Router history={history} onUpdate={routeChange}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage}/>
      <Route path="/business" component={FacultyPage}/>
      <Route path="/computing" component={FacultyPage}/>
      <Route path="/engineering" component={FacultyPage}/>
      <Route path="/s/:studentName" component={StudentPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
