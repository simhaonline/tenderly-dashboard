import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {PlanUsageTypes} from "../../Common/constants";

import {AccountPlan} from "../../Core/models";

import {Button, Dialog, DialogBody} from "../../Elements";

class PaidFeatureButton extends PureComponent {
    state = {
        hasRequiredPlan: true,
        upgradeModalOpen: false,
    };

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
        const {children, usage, plan, dispatch, ...props} = this.props;
        const {upgradeModalOpen} = this.state;

        const hasAbility = plan.usage[usage] ? !plan.usage[usage].used : false;

        if (hasAbility) {
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
                        <p>You have exceeded the limit for your plan.</p>
                        <p>{usage}: {plan.usage[usage].count}/{plan.usage[usage].limit}</p>
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
    usage: PropTypes.oneOf(Object.values(PlanUsageTypes)).isRequired,
    plan: PropTypes.instanceOf(AccountPlan).isRequired,
};

export default PaidFeatureButton;
