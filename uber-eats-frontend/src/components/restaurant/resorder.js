/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import NavBar from '../../NavBar';

export default class resorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      order_id: 0,
      // po_id: 0,
      // redirectVar: false,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/resorderstatus')
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

  //   handleSubmit = (e) => {
  //     e.preventDefault();
  //     this.sendRestAPI({ item: this.state.item });
  //   }

  handlePreparing = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      order_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      order_id: visitdata,
    });
    console.log(this.state.order_id);
    Axios.defaults.withCredentials = true;
    Axios.post('http://54.215.127.115:3001/preparing', visitdata)
      .then((res) => {
        console.log(res.status);
      });
  }

  handleDelivered = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      order_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      order_id: visitdata,
    });
    console.log(this.state.order_id);
    Axios.defaults.withCredentials = true;
    Axios.post('http://54.215.127.115:3001/delivered', visitdata)
      .then((res) => {
        console.log(res.status);
      });
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
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Customer Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Dish Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Details</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Preparing</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>On The Way</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delivered</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Pick Up Ready</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Picked Up</td>
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
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.contact}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                  <td><input type="button" id={item.order_id} value="Order Details" style={{ width: '110px', height: '29px', backgroundColor: '#ffeded' }} /></td>
                  <td><input type="button" id={item.order_id} value="Preparing" style={{ width: '110px', height: '29px', backgroundColor: '#ffe46d' }} onClick={this.handlePreparing} /></td>
                  <td><input type="button" id={item.order_id} value="On the Way" style={{ width: '110px', height: '29px', backgroundColor: '#6dfff0' }} /></td>
                  <td><input type="button" id={item.order_id} value="Delivered" style={{ width: '110px', height: '29px', backgroundColor: '#8fff6d' }} onClick={this.handleDelivered} /></td>
                  <td><input type="button" id={item.order_id} value="Pickup Ready" style={{ width: '110px', height: '29px', backgroundColor: '#6dfff0' }} /></td>
                  <td><input type="button" id={item.order_id} value="Picked Up" style={{ width: '110px', height: '29px', backgroundColor: '#8fff6d' }} /></td>
                  {/* <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td> */}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
