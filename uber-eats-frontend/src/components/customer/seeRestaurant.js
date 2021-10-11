/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import NavBar from '../../NavBar';

export default class seeRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      po_id: 0,
      redirectVar: false,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/sr')
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

  handleVisit = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      p_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      po_id: visitdata,
      redirectVar: true,
    });
    console.log(this.state.po_id);
    console.log(this.state.redirectVar);
    Axios.defaults.withCredentials = true;
    Axios.post('http://54.215.127.115:3001/addtocart', visitdata)
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
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>PID</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Ingredients</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Description</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Category</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Price</td>
                <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Add to Cart</td>
                {/* <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete</td> */}
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item, i) =>
              // eslint-disable-next-line implicit-arrow-linebreak
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_ingredients}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_description}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_category}</td>
                  <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price}</td>
                  <td><input type="button" id={item.p_id} value="Add To Cart" style={{ width: '100px', height: '30px', backgroundColor: '#7bb420' }} onClick={this.handleVisit} /></td>
                  {/* <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td> */}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
