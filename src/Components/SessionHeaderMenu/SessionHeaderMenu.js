import React, {Component} from 'react';
import {connect} from "react-redux";

import {Button} from "../../Elements";

class SessionHeaderMenu extends Component {
    render() {
        const {auth} = this.props;

        if (!auth.retrievedToken) return null;

        if (!auth.loggedIn && !auth.token) {
            return (
                <div>
                    <Button to="/login">
                        login
                    </Button>
                    <Button>
                        Request early access
                    </Button>
                </div>
            )
        }

        const {user, loggedIn} = auth;

        if (!loggedIn) return null;

        return (
            <div className="asd">
                Hey {user.getFullName()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(
    mapStateToProps,
)(SessionHeaderMenu);

