/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ResRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullName: '',
                // lastName: '',
                email: '',
                password: '',
                location: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.fullName && user.email && user.password && user.location) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <br />
                <h4>Restaurant Register</h4>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.fullName ? ' has-error' : '')}>
                        <label htmlFor="fullName">Restaurant Name</label>
                        <input type="text" className="form-control" name="fullName" value={user.fullName} onChange={this.handleChange} />
                        {submitted && !user.fullName &&
                            <div className="help-block">Restaurant Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.location ? ' has-error' : '')}>
                        <label htmlFor="location">Location</label>
                        <input type="location" className="form-control" name="location" value={user.location} onChange={this.handleChange} />
                        {submitted && !user.location &&
                            <div className="help-block">Location is required</div>
                        }
                    </div>
                    <br />
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/reslogin" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedResRegisterPage = connect(mapState, actionCreators)(ResRegisterPage);
export { connectedResRegisterPage as ResRegisterPage };