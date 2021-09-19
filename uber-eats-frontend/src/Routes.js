import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

import { UserLogin } from './components/userlogin/index';
import { userReg } from './components/userlogin/userReg';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={UserLogin} />
          <Route path="/userReg" exact component={userReg} />
        </Switch>
      </Router>
    );
  }
}
