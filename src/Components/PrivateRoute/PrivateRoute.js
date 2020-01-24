import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";
import {getUserPlan} from "../../Common/Selectors/BillingSelectors";
import SessionResolutionPage from "../../Pages/General/SessionResolutionPage";


class PrivateRoute extends Component {

    render() {
        const { component: Component, auth, user, userPlan, resolutionRequired, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    auth.loggedIn ? (
                        resolutionRequired ? <SessionResolutionPage user={user} plan={userPlan}/>
                        : <Component {...props} />
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
        user: state.auth.user,
        userPlan: getUserPlan(state),
        resolutionRequired: state.auth.accountResolutionRequired,
    };
};

export default withRouter(connect(
    mapStateToProps,
)(PrivateRoute));
