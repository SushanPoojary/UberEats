/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import NavBar from '../../NavBar';

export default class userFavourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      remail: '',
      redirect: false,
    //   finalorder: 0,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/getFavourites')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              menuList.push(res.data[i]);
            }
          }
          this.setState({ products: menuList });
        }
      }).catch((err) => {
        throw err;
      });
  }

  handleVisit = (event) => {
    event.preventDefault();
    const visitdata = {
      email: event.target.id,
    };
    console.log(visitdata);
    this.setState({
      remail: visitdata,
      redirect: true,
    });
    console.log(this.state.remail);
    console.log(this.state.redirect);
    Axios.defaults.withCredentials = true;
    Axios.post('http://54.215.127.115:3001/sr', visitdata)
      .then((res) => {
        console.log(res.status);
      });
  }

  render() {
    console.log(this.state.products);
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/seerestaurant" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>
          <div><h3 style={{ paddingLeft: '0.5em' }}>Favourites</h3></div>
          <table>
            <thead>
              <tr>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>FID</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Timings</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Visit</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Remove Favourite</td>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item, i) =>
              // eslint-disable-next-line implicit-arrow-linebreak
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.location}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.timings}</td>
                  <td><input type="button" id={item.email} value="Visit" style={{ width: '100px', height: '30px', backgroundColor: '#7bb420' }} onClick={this.handleVisit} /></td>
                  <td><input type="button" id={item.po_id} value="Remove" style={{ width: '100px', height: '30px', backgroundColor: '#fc465a' }} /></td>
                  {/* <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td> */}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
