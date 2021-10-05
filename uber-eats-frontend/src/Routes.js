import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import history from './history';
import NavBar from './NavBar';
import { UserLogin } from './components/customer/index';
import { userReg } from './components/customer/userReg';
import { resLogin } from './components/restaurant/index';
import { resReg } from './components/restaurant/resReg';
import { resHome } from './components/restaurant/resHome';
// import resProfile from './components/restaurant/resProfile';
import resProfile from './components/restaurant/resProfile';
import userProfile from './components/customer/userProfile';

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
          <Route path="/resHome" exact component={resHome} />
          <Route path="/resProfile" exact component={resProfile} />
          <Route path="/userprofile" exact component={userProfile} />
        </Switch>
      </Router>
    );
  }
}
