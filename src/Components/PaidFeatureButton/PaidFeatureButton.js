import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {UserPlanTypes} from "../../Common/constants";

import {Button} from "../../Elements";

class PaidFeatureButton extends PureComponent {
    handleOnClick = (event) => {
        const {onClick} = this.props;

        event.stopPropagation();
        event.preventDefault();

        if (onClick) {
            onClick(event);
        }
    };

    render() {
        const {children, ...props} = this.props;

        return (
            <Button {...props} onClick={this.handleOnClick}>
                {children}
            </Button>
        );
    }
}

PaidFeatureButton.propTypes = {
    planRequired: PropTypes.oneOf([Object.values(UserPlanTypes)]),
};

const mapStateToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
)(PaidFeatureButton);
