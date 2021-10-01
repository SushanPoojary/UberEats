import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import cookie from 'react-cookies';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import history from './history';
// eslint-disable-next-line import/no-cycle
import { resReg } from './resReg';

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

export class resLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
      authFlag: false,
    };
  }

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      authFlag: false,
    });
  }

  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;
    console.log(email, password);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/reslogin', {
      email,
      password,
    }).then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          authFlag: true,
        });
      } else {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          authFlag: false,
        });
      }
    });
  }

  render() {
    let redirectVar = null;
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to="/navbar" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <form>
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
                  <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} />
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} />
                  <br />
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
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  Register your Business?
                  <Router forceRefresh>
                    <Link to="/resReg" onClick={() => history.push('/resReg')} style={{ color: 'green' }}> Create an account</Link>
                    <Switch>
                      <Route exact path="/resReg" component={resReg} />
                    </Switch>
                  </Router>
                </OverallText>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
