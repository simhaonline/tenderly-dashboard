import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {UserPlanTypes} from "../../Common/constants";

import {Button, Dialog, DialogBody} from "../../Elements";

class PaidFeatureButton extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasRequiredPlan: false,
            upgradeModalOpen: false,
        };
    }


    handleOnClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            upgradeModalOpen: true,
        });
    };

    handleModalClose = () => {
        this.setState({
            upgradeModalOpen: false,
        });
    };

    render() {
        const {children, planRequired, dispatch, ...props} = this.props;
        const {upgradeModalOpen, hasRequiredPlan} = this.state;

        if (hasRequiredPlan) {
            return <Button {...props}>
                {children}
            </Button>;
        }

        return (
            <Fragment>
                <Button {...props} onClick={this.handleOnClick}>
                    {children}
                </Button>
                <Dialog open={upgradeModalOpen} onClose={this.handleModalClose}>
                    <DialogBody>
                        <h2>Pro</h2>
                        <h3>$250 / mo</h3>
                        <Button size="large" color="secondary" stretch>
                            <span className="SemiBoldText">Start Free Trial</span>
                        </Button>
                        <div className="FontSize2 MarginLeft2 MarginTop2">* 14-day free Trial. No credit card required.</div>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

PaidFeatureButton.propTypes = {
    planRequired: PropTypes.oneOf(Object.values(UserPlanTypes)).isRequired,
};

const mapStateToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
)(PaidFeatureButton);
