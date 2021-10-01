import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import history from './history';
import NavBar from './NavBar';
import { UserLogin } from './components/userlogin/index';
import { userReg } from './components/userlogin/userReg';
import { resLogin } from './components/reslogin/index';
import { resReg } from './components/reslogin/resReg';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={NavBar} />
          <Route path="/login" exact component={UserLogin} />
          <Route path="/userReg" exact component={userReg} />
          <Route path="/reslogin" exact component={resLogin} />
          <Route path="/resReg" exact component={resReg} />
        </Switch>
      </Router>
    );
  }
}
