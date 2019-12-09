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
        const {children, usage, includes, plan, dispatch, ...props} = this.props;
        const {upgradeModalOpen} = this.state;

        let hasAbility = false;

        if (usage) {
            hasAbility = plan.usage[usage] ? plan.usage[usage].used : false;
        } else if (includes) {
            hasAbility = !!includes.split('.').reduce((data, key) => {
                if (!data || !data[key]) return false;

                return data[key];
            }, plan.plan.includes);
        }

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
                        {!!usage && <div>
                            <p>You have exceeded the limit for your plan.</p>
                            <p>{usage}: {plan.usage[usage].count}/{plan.usage[usage].limit}</p>
                        </div>}
                        {!!includes && <div>
                            <p>This is not included in your current plan</p>
                        </div>}
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
    usage: PropTypes.oneOf(Object.values(PlanUsageTypes)),
    includes: PropTypes.string,
    plan: PropTypes.instanceOf(AccountPlan).isRequired,
};

export default PaidFeatureButton;
