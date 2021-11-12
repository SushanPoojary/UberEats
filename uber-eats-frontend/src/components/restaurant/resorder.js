/* eslint-disable dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable brace-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import NavBar from '../../NavBar';

class resorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      order_id: '',
      actions: '',
      redirect: false,
      inOS: '',
      filter: false,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get('http://localhost:3001/resorderstatus')
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
          this.props.dispatch({
            type: 'RESTAURANT_ORDER_MANAGEMENT',
            payload: true,
          });
        }
      }).catch((err) => {
        throw err;
      });
  }

  // componentDidUpdate(props, state) {
  //   if (state.inOS !== this.state.inOS) {
  //     console.log('input changed');
  //   }
  // }

  finalFilter = (filData) => {
    console.log(filData);
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.post('http://localhost:3001/filteresorders', filData)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ products: res.data });
          this.setState({ filter: true });
        } else {
          // this.setState({ search: false });
        }
      });
  }

  finalActions = (actionData) => {
    console.log(actionData);
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.post('http://localhost:3001/resorderactions', actionData)
      .then((res) => {
        if (res.status === 200) {
          // console.log('A');
        } else {
          // this.setState({ search: false });
        }
      });
  }

  handleChangeOS = (e) => {
    this.setState({ inOS: e.target.value });
    console.log(e.target.value);
  }

  handleChangeActions = (e) => {
    this.setState({
      order_id: e.target.id,
      actions: e.target.value,
    });
  }

  handleActions = (e) => {
    e.preventDefault();
    this.setState({
      order_id: e.target.id,
    });
    const actionData = {
      order_id: this.state.order_id,
      actions: this.state.actions,
    };
    this.finalActions(actionData);
  }

  handleFilter = (e) => {
    e.preventDefault();
    const filData = {
      inOS: this.state.inOS,
    };
    this.finalFilter(filData);
  }

  onClickButton = (event) => {
    event.preventDefault();
    const orderNum = event.target.id;
    const visitdata = {
      order_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      order_id: event.target.id,
    });
    console.log(this.state.order_id);
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.post('http://localhost:3001/rorderdeets', visitdata)
      .then((res) => {
        console.log(res.status);
        this.setState({ redirect: true });
      });
  }

  render() {
    console.log(this.state.products);
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/rorderdeets" />;
    }
    if (!this.state.filter) {
      return (
        <div>
          <NavBar />
          {redirectVar}
          <div>
            <Form inline>
              <Container>
                <Row>
                  <Col>
                    <label>
                      Order Status: &nbsp;
                      <select onChange={this.handleChangeOS}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" onClick={this.handleFilter}>Filter Order</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <div><h3>&nbsp;&nbsp;Order Management</h3></div>
            <table>
              <thead>
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>OID</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Customer Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Time</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Details</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Change Order Status</td>
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
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.ordertime}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                    <td><Button variant="dark" id={item.ordertime} onClick={this.onClickButton}>Order Details</Button></td>
                    <label>
                      <select onChange={this.handleChangeActions}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" id={item.ordertime} onClick={this.handleActions}>Confirm Action</Button>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <NavBar />
          {redirectVar}
          <div>
            <Form inline>
              <Container>
                <Row>
                  <Col>
                    <label>
                      Order Status: &nbsp;
                      <select onChange={this.handleChangeOS}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" onClick={this.handleFilter}>Filter Order</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <div><h3>&nbsp;&nbsp;Order Management</h3></div>
            <table>
              <thead>
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>OID</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Customer Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Time</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Details</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Change Order Status</td>
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
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.ordertime}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                    <td><Button variant="dark" id={item.ordertime} onClick={this.onClickButton}>Order Details</Button></td>
                    <label>
                      <select onChange={this.handleChangeActions}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" id={item.ordertime} onClick={this.handleActions}>Confirm Action</Button>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { restOrders: state.restOrders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(resorder);
