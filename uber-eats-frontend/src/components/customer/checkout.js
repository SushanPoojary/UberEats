/* eslint-disable react/sort-comp */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCartQuery } from '../../queries/queries';
import { orderMutation, cartDelMutation } from '../../mutations/mutations';
import NavBar from '../../NavBar';

class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      currentDateTime: Date().toLocaleString(),
    };
  }

  displayCheckout() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      console.log(data.getCart);
      console.log(this.state.currentDateTime);
      const orderValue = Math.round(((data.getCart[0].quantity * data.getCart[0].p_price) + Number.EPSILON) * 100) / 100;
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
            <table>
              <thead>
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>CID</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Restaurant Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Dish Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Quantity</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Price</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Total Price</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Special Instructions</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete from Cart</td>
                </tr>
              </thead>
              <tbody>
                {data.getCart.map((item, i) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                  <tr>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.name}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{Math.round(((item.p_price * item.quantity) + Number.EPSILON) * 100) / 100}</td>
                    <td><input type="text" id={item.po_id} placeholder="Add a note for the store" style={{ width: '390px', height: '35px' }} /></td>
                    <td><input type="button" id={item.po_id} value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#fc465a' }} /></td>
                  </tr>)}
              </tbody>
            </table>
            <div>
              &nbsp;&nbsp;
              Subtotal:
              $
              {orderValue}
            </div>
            <div>
            &nbsp;&nbsp;
              Taxes:
              $
              {taxes}
            </div>
            <div>
            &nbsp;&nbsp;
              Service Fee:
              $
              { serviceFee }
            </div>
            <div>
            &nbsp;&nbsp;
              Total Price:
              $
              { totalordervalue }
            </div>
            <br />
            &nbsp;&nbsp;
            <input type="button" id={data.getCart[0].po_id} value="Order" style={{ width: '100px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
          </div>
        </div>
      );
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    console.log(orderNum);
    const visitdata = {
      po_id: orderNum,
    };
    this.props.orderMutation({
      variables: visitdata,
    })
      .then((res) => {
        console.log('Frontend');
        console.log(res);
        this.setState({
          redirect: true,
        });
      }).catch((err) => {
        console.log(err);
      });
    this.props.cartDelMutation({
      variables: visitdata,
    })
      .then((res) => {
        console.log('Frontend');
        console.log(res);
        this.setState({
          redirect: true,
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.displayCheckout()}
      </div>
    );
  }
}

export default compose(
  graphql(getCartQuery),
  graphql(orderMutation, { name: 'orderMutation' }),
  graphql(cartDelMutation, { name: 'cartDelMutation' }),
)(checkout);
