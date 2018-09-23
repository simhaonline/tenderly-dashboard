import React, {Component} from 'react';
import {connect} from "react-redux";

class SessionHeaderMenu extends Component {
    render() {
        const {auth} = this.props;

        console.log(auth);

        if (!auth.loggedIn) {
            return (
                <div>
                    <button>
                        Request early access
                    </button>
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

