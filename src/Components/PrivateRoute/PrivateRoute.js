import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";

class PrivateRoute extends Component {
    render() {
        const { component: Component, user, ...rest } = this.props;

        console.log(user);

        return (
            <Route
                {...rest}
                render={props =>
                    user.loggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default withRouter(connect(
    mapStateToProps,
)(PrivateRoute));
