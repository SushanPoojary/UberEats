// /* eslint-disable */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
// import { Glyphicon } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import {
  Navbar,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
// import Icon from '@mui/material/Icon';
// import RestaurantIcon from '@mui/icons-material/Restaurant';

// create the Navbar Component
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  // handle logout to destroy the cookie

    handleLogout = () => {
      localStorage.removeItem('ubereatsResToken');
      // cookie.remove('cookie', { path: '/' });
    }

    handleUserLogout = () => {
      localStorage.removeItem('ubereatsUserToken');
    }

    render() {
      let navBarButtons = null;
      const buttonStyle = {
        margin: '6px',
      };

      if (localStorage.getItem('ubereatsResToken')) {
        console.log('Restaurant Active sesh!');
        navBarButtons = (
          <Form className="offset-sm-9" inline>
            {/* <Button variant="link" style={btnStyle} href='/reshome'>Home</Button> */}
            <NavDropdown title="Restaurant Account" id="nav-dropdown">
              <NavDropdown.Item href="/resprofile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/additem">Add Menu Item</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout} href="/">Logout</NavDropdown.Item>
            </NavDropdown>
          </Form>
        );
      } else if (localStorage.getItem('ubereatsUserToken')) {
        console.log('User Active Sesh!');
        navBarButtons = (
          <Form className="offset-sm-9" inline>
            <Button variant="link" style={buttonStyle} href="/cart">Cart</Button>
            <NavDropdown title="Account" id="nav-dropdown">
              <NavDropdown.Item href="/order">Order</NavDropdown.Item>
              <NavDropdown.Item href="/prevorder">Previous Orders</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleUserLogout} href="/">Logout</NavDropdown.Item>
            </NavDropdown>
          </Form>
        );
      } else {
        console.log('No Active sesh!');
        navBarButtons = (
          <Form className="offset-sm-8" inline>
            <Button variant="success" style={buttonStyle} href="/login">Login</Button>
            <Button variant="outline-success" style={buttonStyle} href="/userReg">Sign Up</Button>
            <Button variant="primary" style={buttonStyle} href="/reslogin">Business?</Button>
          </Form>
        );
      }
      return (
        <div>
          <Navbar className="offset-sm-1" bg="white" expand="lg">
            <Navbar.Brand href="/home" bsPrefix="mainNavBrand-logo">UberEats</Navbar.Brand>
            {navBarButtons}
          </Navbar>
        </div>
      );
    }
}
export default NavBar;

//     render() {
//       // if Cookie is set render Logout Button

//       let navLogin = null;
//       if (cookie.load('cookie')) {
//         console.log('Able to read cookie');
//         navLogin = (
//           <ul className="nav navbar-nav navbar-right">
//             <li>
//               <Link to="/navbar" onClick={this.handleLogout}>
//                 <span className="glyphicon glyphicon-cutlery" />
//                 Logout
//               </Link>
//             </li>
//           </ul>
//         );
//       } else {
//         // Else display login button
//         console.log('Not Able to read cookie');
//         navLogin = (
//           <Link to="/login">
//             <span className="glyphicon glyphicon-log-in" />
//             Login
//           </Link>
//         );
//       }
//       let redirectVar = null;
//       if (cookie.load('cookie')) {
//         redirectVar = <Redirect to="/navbar" />;
//       }
//       return (
//         <div>
//           {redirectVar}
//           <nav className="nav avbar-nav navbar-right">
//             <div className="container-fluid">
//               {/* <div className="navbar-header">
//                 <a Link to="/" className="navbar-brand">UberEats</a>
//               </div> */}
//               {/* <ul className="nav navbar-nav" style={{ flexDirection: 'row' }}>
//                 <div><li className="active"><Link to="/home">Home</Link></li></div>
//                 <li><Link to="/create">Add a Book</Link></li>
//                 <li><Link to="/delete">Delete a Book</Link></li>
//               </ul> */}
//               <div style={{ float: 'right', marginLeft: '100px' }}>
//                 <Button variant="contained">
//                   <RestaurantIcon />
//                   {navLogin}
//                 </Button>
//               </div>
//             </div>
//           </nav>
//         </div>
//       );
//     }
// }

// export default NavBar;
