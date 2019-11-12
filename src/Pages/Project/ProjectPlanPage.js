import React, {Component} from 'react';
import {connect} from "react-redux";

import {UserPlanTypes} from "../../Common/constants";

import {Page, PageHeading} from "../../Elements";
import {SubscriptionPlan, ProjectPlanUsage} from "../../Components";

class ProjectPlanPage extends Component {
    state = {
        planUsage: {
            contracts: {
                used: 2,
                available: 3,
            },
            wallets: {
                used: 0,
                available: 1,
            },
            alerts: {
                used: 1,
                available: 3,
            },
        },
    };
    render() {
        const {userPlan} = this.props;
        const {planUsage} = this.state;

        return (
            <Page>
                <PageHeading>
                    <h1>Plan</h1>
                </PageHeading>
                <SubscriptionPlan plan={userPlan}/>
                <ProjectPlanUsage usage={planUsage}/>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPlan: UserPlanTypes.PRO,
    }
};

export default connect(
    mapStateToProps,
)(ProjectPlanPage);
