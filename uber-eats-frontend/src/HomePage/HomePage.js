/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md">
                <br />
                <h5>Hi {user.fullName}!</h5>
                <h5>Welcome to UberEats!</h5>
                {/* <h6>All registered users:</h6> */}
                {/* {users.loading && <em>Loading users...</em>} */}
                {/* {users.error && <span className="text-danger">ERROR: {users.error}</span>} */}
                {/* {users.items &&
                    <ol>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.fullName}
                            </li>
                        )}
                    </ol>
                } */}
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };