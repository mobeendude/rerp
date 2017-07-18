import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';

import SignUpPage from './containers/SignUpPage';
import Auth from './containers/Auth';
import TodoListPage from './Todo/pages/TodoListPage';
export default (
  <Route path="/" component={App}>

  <IndexRoute    component= {HomePage}   />
    <Route path="/counter" component={CounterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignUpPage} />
     <Route path="/todo" component={TodoListPage} />
     <Route path="/logout" component={HomePage} />
  </Route>
);
