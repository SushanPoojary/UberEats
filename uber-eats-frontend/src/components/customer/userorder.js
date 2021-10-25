/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import NavBar from '../../NavBar';

export default class userorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      // po_id: 0,
      // redirectVar: false,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/orderstatus')
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendRestAPI({ item: this.state.item });
  }

  render() {
    console.log(this.state.products);
    return (
      <div>
        <NavBar />
        <div>
          <table>
            <thead>
              <tr>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>OID</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                {/* <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete</td> */}
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item, i) =>
              // eslint-disable-next-line implicit-arrow-linebreak
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.location}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                  <td><input type="button" id={item.po_id} value="Order Details" style={{ width: '110px', height: '29px', backgroundColor: '#7bb420' }} /></td>
                  {/* <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td> */}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
