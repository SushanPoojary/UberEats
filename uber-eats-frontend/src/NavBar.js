import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
// import { Glyphicon } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
// import Icon from '@mui/material/Icon';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// create the Navbar Component
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  // handle logout to destroy the cookie

    handleLogout = () => {
      cookie.remove('cookie', { path: '/' });
    }

    render() {
      // if Cookie is set render Logout Button

      let navLogin = null;
      if (cookie.load('cookie')) {
        console.log('Able to read cookie');
        navLogin = (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/navbar" onClick={this.handleLogout}>
                <span className="glyphicon glyphicon-cutlery" />
                Logout
              </Link>
            </li>
          </ul>
        );
      } else {
        // Else display login button
        console.log('Not Able to read cookie');
        navLogin = (
          <Link to="/login">
            <span className="glyphicon glyphicon-log-in" />
            Login
          </Link>
        );
      }
      let redirectVar = null;
      if (cookie.load('cookie')) {
        redirectVar = <Redirect to="/navbar" />;
      }
      return (
        <div>
          {redirectVar}
          <nav className="nav avbar-nav navbar-right">
            <div className="container-fluid">
              {/* <div className="navbar-header">
                <a Link to="/" className="navbar-brand">UberEats</a>
              </div> */}
              {/* <ul className="nav navbar-nav" style={{ flexDirection: 'row' }}>
                <div><li className="active"><Link to="/home">Home</Link></li></div>
                <li><Link to="/create">Add a Book</Link></li>
                <li><Link to="/delete">Delete a Book</Link></li>
              </ul> */}
              <div style={{ float: 'right', marginLeft: '100px' }}>
                <Button variant="contained">
                  <RestaurantIcon />
                  {navLogin}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      );
    }
}

export default NavBar;
