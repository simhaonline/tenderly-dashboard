import React, {Component} from 'react';

import {FeatureFlagTypes} from "../../Common/constants";

import {Card, Icon} from "../../Elements";
import {FeatureFlag} from "../index";

class PublicContractQuickActions extends Component {
    render() {
        return (
            <div className="DisplayFlex MarginBottom4">
                <Card onClick={() => {}} className="PublicContractQuickAction">
                    <Icon icon="project"/>
                    <span>Add to Project</span>
                </Card>
                <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                    <Card onClick={() => {}} className="PublicContractQuickAction">
                        <Icon icon="alerting"/>
                        <span>Setup Alerts</span>
                    </Card>
                </FeatureFlag>
                <Card onClick={() => {}} className="PublicContractQuickAction">
                    <Icon icon="filter"/>
                    <span>Filter Transactions</span>
                </Card>
            </div>
        );
    }
}

export default PublicContractQuickActions;
