/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import NavBar from '../../NavBar';

export default class temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      po_id: 0,
      redirect: false,
      totalprice: 0,
    //   finalorder: 0,
    };
  }

  componentDidMount() {
    const menuList = [];
    const restlist = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/getCart')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].name !== restlist[0]) {
                menuList.push(res.data[i]);
                restlist.push(res.data[i].name);
                console.log(res.data[i].name);
              }
            }
          }
          this.setState({ products: menuList });
        }
      }).catch((err) => {
        throw err;
      });
    console.log(restlist);
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/getPrice')
      .then((res) => {
        if (res) {
          console.log(res.data);
          this.setState({ totalprice: res.data[0].total_price });
        }
      }).catch((err) => {
        throw err;
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const finalorderint = parseFloat(event.target.id, 10);
    // console.log(finalorderint);
    // this.setState({ finalorder: finalorderint });
    const {
      products,
    } = this.state;
    console.log(products);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/order', products)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log(response);
        const status = response.status;
        if (status !== 200) {
          this.setState({
            redirect: false,
          });
        } else {
          console.log('Andar');
          this.setState({
            redirect: true,
          });
        }
      });
    Axios.post('http://localhost:3001/cartorder', products)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log(response);
        const status = response.status;
        if (status !== 200) {
          this.setState({
            redirect: false,
          });
        } else {
          console.log('Andar');
          this.setState({
            redirect: true,
          });
        }
      });
  }

  handleDelete = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      po_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      po_id: visitdata,
    });
    console.log(this.state.po_id);
    console.log(this.state.redirectVar);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/deletefromcart', visitdata)
      .then((res) => {
        console.log(res.status);
      });
  }

  render() {
    console.log(this.state.products);
    const orderValue = Math.round(((this.state.totalprice) + Number.EPSILON) * 100) / 100;
    const taxes = Math.round(((orderValue / 10) + Number.EPSILON) * 100) / 100;
    const serviceFee = Math.round(((orderValue / 7.5) + Number.EPSILON) * 100) / 100;
    const totalvalue = orderValue + taxes + serviceFee;
    const totalordervalue = Math.round(((totalvalue) + Number.EPSILON) * 100) / 100;
    console.log(orderValue);
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/order" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>
          <div><h3 style={{ paddingLeft: '0.5em' }}>Checkout</h3></div>
          <div><h3 style={{ paddingLeft: '0.5em' }}>{this.state.products.name}</h3></div>
          <table>
            <thead>
              <tr>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>CID</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Quantity</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Price</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Total Price</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete from Checkout</td>
                {/* <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete</td> */}
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item, i) =>
              // eslint-disable-next-line implicit-arrow-linebreak
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price * item.quantity}</td>
                  <td><input type="button" id={item.po_id} value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#fc465a' }} onClick={this.handleDelete} /></td>
                  {/* <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td> */}
                </tr>)}
            </tbody>
          </table>
          <div>
            Order Value:
            $
            {orderValue}
          </div>
          <div>
            Taxes:
            $
            {taxes}
          </div>
          <div>
            Service Fee:
            $
            { serviceFee }
          </div>
          <div>
            Total Price:
            $
            { totalordervalue }
          </div>
          <input type="button" id={totalordervalue} value="Order" style={{ width: '100px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
