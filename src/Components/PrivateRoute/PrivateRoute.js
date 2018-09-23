import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";

class PrivateRoute extends Component {
    render() {
        const { component: Component, auth, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    auth.loggedIn ? (
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
        auth: state.auth,
    };
};

export default withRouter(connect(
    mapStateToProps,
)(PrivateRoute));
