import React, {Component} from 'react';

import {Button} from "../../Elements";
import {connect} from "react-redux";

class PaidFeatureMessage extends Component {
    render() {
        return (
            <div className="PaidFeatureMessage">
                <div>
                    <div>Sign up for Pro plan trial</div>
                    <div>No credit card required</div>
                </div>
                <div>
                    <Button>
                        Start Trial
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(
    mapStateToProps,
)(PaidFeatureMessage);
