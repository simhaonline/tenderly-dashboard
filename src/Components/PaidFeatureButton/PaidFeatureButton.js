import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {PlanUsageTypes} from "../../Common/constants";

import {AccountPlan} from "../../Core/models";

import {Button, Dialog, DialogBody} from "../../Elements";

import "./PaidFeatureButton.scss";
import Intercom from "../../Utils/Intercom";
import {getLabelForPlanUsage} from "../../Utils/BillingHelpers";

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

        if (plan && usage) {
            hasAbility = plan.usage[usage] ? !plan.usage[usage].used : false;
        } else if (plan && includes) {
            hasAbility = !!includes.split('.').reduce((data, key) => {
                if (!data || !data[key]) return false;

                return data[key];
            }, plan.plan.includes);
        }

        // @TODO @BILLING Remove when implement billing
        if (hasAbility) {
            return <Button type="button" {...props}>
                {children}
            </Button>;
        }
        console.log(plan)
        return (
            <Fragment>
                <Button {...props} onClick={this.handleOnClick}>
                    {children}
                </Button>
                <Dialog open={upgradeModalOpen} onClose={this.handleModalClose} className='PaidFeatureButton__ModalContent'>
                    <DialogBody>
                        <h2>Tenderly Pro</h2>
                        {plan && !!usage && <div>
                            <p>You have exceeded the limit for your plan.</p>
                            <p>{getLabelForPlanUsage(usage)}: {plan.usage[usage].count}/{plan.usage[usage].limit}</p>
                        </div>}
                        {plan && !!includes && <div>
                            <p>This is not included in your current plan</p>
                        </div>}
                        <div>
                            <h3>Unlock Tenderly Pro</h3>
                            <ul>
                                <li>Multiple Projects</li>
                                <li>Collaborators</li>
                                <li>Analytics</li>
                                <li>Real-time Alerting</li>
                                <li>Transaction Filtering</li>
                                <li>Private Network Support</li>
                            </ul>
                        </div>
                        <Button size="large" color="secondary" stretch onClick={() => Intercom.openNewConversation('Tenderly Pro upgrade info:\n')}>
                            <span className="SemiBoldText">Upgrade</span>
                        </Button>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

PaidFeatureButton.propTypes = {
    usage: PropTypes.oneOf(Object.values(PlanUsageTypes)),
    includes: PropTypes.string,
    plan: PropTypes.instanceOf(AccountPlan),
};

export default PaidFeatureButton;
