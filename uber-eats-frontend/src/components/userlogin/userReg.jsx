import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import userReg from './userReg.jsx';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import history from './history';
// eslint-disable-next-line import/no-cycle
import { UserLogin } from './index';

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

export class userReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <HeadText>
              Let&apos;s get started
              <br />
              <br />
            </HeadText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              Enter your details(required).
              <br />
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              <form>
                <input type="text" name="name" placeholder=" Name " style={{ width: '390px', height: '35px' }} required />
                <br />
              </form>
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              <form>
                <input type="tel" name="contact" placeholder=" Contact Number " style={{ width: '390px', height: '35px' }} required />
                <br />
              </form>
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              <form>
                <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} required />
                <br />
              </form>
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              <form>
                <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} required />
                <br />
                <br />
              </form>
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              <form>
                <input type="submit" value="Register" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} />
              </form>
            </OverallText>
          </div>
        </div>
        <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              Already have an account?
              <Router forceRefresh>
                <Link to="/login" onClick={() => history.push('/login')} style={{ color: 'green' }}> Login</Link>
                <Switch>
                  <Route exact path="/login" component={UserLogin} />
                </Switch>
              </Router>
            </OverallText>
          </div>
        </div>
      </div>
    );
  }
}