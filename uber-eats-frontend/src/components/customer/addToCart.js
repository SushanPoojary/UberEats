/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import NavBar from '../../NavBar';

export default class addToCart extends React.Component {
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
    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/getCart')
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

    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/getPrice')
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
    Axios.post('http://54.215.127.115:3001/order', products)
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
    Axios.post('http://54.215.127.115:3001/cartorder', products)
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
    Axios.post('http://54.215.127.115:3001/deletefromcart', visitdata)
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
          <div><h3 style={{ paddingLeft: '0.5em' }}>Cart</h3></div>
          <table>
            <thead>
              <tr>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>CID</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Category</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Price</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete from Cart</td>
                {/* <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete</td> */}
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item, i) =>
              // eslint-disable-next-line implicit-arrow-linebreak
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_category}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price}</td>
                  <td><input type="button" id={item.po_id} value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#7bb420' }} onClick={this.handleDelete} /></td>
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
