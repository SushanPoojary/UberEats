/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';

export default class temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/resAddItems')
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

  render() {
    console.log(this.state.products);
    return (
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
              <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Edit</td>
              <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Delete</td>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((item) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              <tr>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_id}</td>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_name}</td>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_ingredients}</td>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_description}</td>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_category}</td>
                <td style={{ textAlign: 'left', padding: '1em' }}>{item.p_price}</td>
                <td><input type="button" value="Edit" style={{ width: '100px', height: '30px', backgroundColor: '#7bb420' }} /></td>
                <td><input type="button" value="Delete" style={{ width: '100px', height: '30px', backgroundColor: '#FF0000' }} /></td>
              </tr>)}
            <td><input type="button" value="Add" style={{ width: '100px', height: '30px', backgroundColor: '#7bb420' }} /></td>
          </tbody>
        </table>
      </div>
    );
  }
}
