import React, {Component} from 'react';
import {connect} from "react-redux";

import {Button} from "../../Elements";

class SessionHeaderMenu extends Component {
    render() {
        const {auth} = this.props;

        if (!auth.loggedIn) {
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

        const {user} = auth;

        return (
            <div className="asd">
                Hey {user.firstName} {user.lastName}
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

