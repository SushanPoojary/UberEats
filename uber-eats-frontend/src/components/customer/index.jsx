/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
// import cookie from 'react-cookies';
// import Axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
// import { connect } from 'react-redux';
import history from './history';
// eslint-disable-next-line import/no-cycle
import userReg from './userReg';
import NavBar from '../../NavBar';
import { UserLoginMutation } from '../../mutations/mutations';

const HeadText = styled.h2`
    font-size: 30px;
    font-weight: 500;
    line-height: 1.24;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;
const OverallText = styled.h2`
    font-size: 18px;
    font-weight: 300;
    line-height: 1.00;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authMessage: '',
      emailValid: '',
      passwordValid: '',
      emailError: '',
      passwordError: '',
      authMessageE: '',
    };
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    // console.log('validation');
    const {
      emailValid,
      passwordValid,
      authFlag,
      authMessage,
    } = this.state;
    const emailError = emailValid ? '' : 'Email is invalid';
    const passwordError = passwordValid ? '' : 'Password is invalid';
    const authMessageE = authFlag ? '' : authMessage;
    this.setState({
      emailError,
      passwordError,
      authMessageE,
    });
  }

  emailInputHandler = (event) => {
    console.log(event.target.value);
    const email = event.target.value;
    const emailRegExp = new RegExp('.+@.+\\..+');
    if (email !== '' && emailRegExp.test(email)) {
      this.setState({
        email,
        emailValid: true,
      });
    } else {
      this.setState({
        emailValid: false,
      });
    }
  }

  passwordInputHandler = (event) => {
    console.log(event.target.value);
    const password = event.target.value;
    if (password !== '') {
      this.setState({
        password,
        passwordValid: true,
      });
    } else {
      this.setState({
        passwordValid: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const logdata = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(logdata);
    this.props.UserLoginMutation({ variables: logdata })
      .then((response) => {
        console.log(response);
        console.log('Status Code : ', response.data.status);
        localStorage.setItem('ubereatsUserToken', 'UberEatsSP');
        this.setState({
          authFlag: true,
          authMessage: '',
        });
      }); this.handleValidation();
  }

  render() {
    let redirectVar = null;
    if (this.state.authFlag) {
      // console.log('cookie');
      redirectVar = <Redirect to="/homepage" />;
    }
    // console.log(this.props.redirectHome);
    const redirectHome = this.props.redirectUserLoginHome;
    const emailError = this.state.emailError;
    const passwordError = this.state.passwordError;
    const authMessageE = this.state.authMessageE;
    return (
      <div>
        {redirectVar}
        {redirectHome}
        <NavBar />
        <div className="container">
          <Form>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <HeadText>
                  Welcome back
                  <br />
                  <br />
                </HeadText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  Sign in with your email address.
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.emailInputHandler} />
                  <span style={{ color: 'red' }}>
                    {emailError}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.passwordInputHandler} />
                  <span style={{ color: 'red' }}>
                    {passwordError}
                  </span>
                  <br />
                  <span style={{ color: 'red' }}>
                    {authMessageE}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="button" value="Login" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
                </OverallText>
              </div>
            </div>
            <OverallText>
              New to Uber?
              <Router forceRefresh>
                <Link to="/userReg" onClick={() => history.push('/userReg')} style={{ color: 'green' }}> Create an account</Link>
                <Switch>
                  <Route exact path="/userReg" component={userReg} />
                </Switch>
              </Router>
            </OverallText>
          </Form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(UserLoginMutation, { name: 'UserLoginMutation' }),
)(UserLogin);
