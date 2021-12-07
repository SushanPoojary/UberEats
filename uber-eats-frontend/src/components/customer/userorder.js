/* eslint-disable react/sort-comp */
/* eslint-disable no-restricted-globals */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable object-shorthand */
/* eslint-disable brace-style */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router';
// import { connect } from 'react-redux';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAllOrdersQuery } from '../../queries/queries';
import { userRecieptMutation } from '../../mutations/mutations';
import './paginate.css';
import NavBar from '../../NavBar';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class userorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filter: false,
      inOS: '',
      order_id: '',
      offset: 0,
      perPage: 5,
      currentPage: 0,
      tabledata: [],
      isOpen: false,
      redirect: false,
      toastcancel: false,
      // pageNumber: '',
      // po_id: 0,
      // redirectVar: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  displayOrders() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      let redirectVar = null;
      if (this.state.redirect) {
        redirectVar = <Redirect to="/uorderdeets" />;
      }
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
            <div><h3>&nbsp;&nbsp;Orders</h3></div>
            <table>
              <thead>
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Restaurant Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Time</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Details</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Cancel Order</td>
                </tr>
              </thead>
              <tbody>
                {data.getAllOrders.map((item) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                  <tr>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.name}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.location}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.contact}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.ordertime}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                    <td><Button variant="dark" id={item.ordertime} onClick={this.onClickButton}>Order Details</Button></td>
                    <td><Button variant="danger">Cancel Order</Button></td>
                  </tr>)}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
            <label>
              &nbsp;&nbsp;
              Number of Orders: &nbsp;
              <select onChange={this.handlePageDrop}>
                <option>Select</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>
        </div>
      );
    }
  }

  componentDidUpdate(props, state) {
    if (state.perPage !== this.state.perPage) {
      console.log('input changed');
      this.getData();
    }
  }

  handleOk() {
    this.setState({ isOpen: false });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    }, () => {
      this.loadMoreData();
    });
  }

  onClickButton = (event) => {
    event.preventDefault();
    const orderNum = event.target.id;
    const visitdata = {
      ordertime: orderNum,
    };
    console.log(visitdata);
    this.setState({
      order_id: event.target.id,
    });
    console.log(this.state.order_id);
    this.props.userRecieptMutation({
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

  handlePageDrop = (e) => {
    const pageI = parseInt(e.target.value, 10);
    this.setState({ perPage: pageI });
    console.log(e.target.value);
    console.log(this.state.perPage);
  }

  loadMoreData() {
    const data = this.state.products;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tabledata: slice,
    });
  }

  render() {
    return (
      <div>
        {this.displayOrders()}
      </div>
    );
  }
}

export default compose(
  graphql(getAllOrdersQuery),
  graphql(userRecieptMutation, { name: 'userRecieptMutation' }),
)(userorder);
