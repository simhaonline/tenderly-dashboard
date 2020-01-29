import React, {Component} from 'react';
import {connect} from "react-redux";

import {getUserPlan} from "../../Common/Selectors/BillingSelectors";

import {Page, PageHeading} from "../../Elements";
import {ProjectPlanUsage} from "../../Components";

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
        const {planUsage} = this.state;

        return (
            <Page>
                <PageHeading>
                    <h1>Plan</h1>
                </PageHeading>
                <ProjectPlanUsage usage={planUsage}/>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPlan: getUserPlan(state),
    }
};

export default connect(
    mapStateToProps,
)(ProjectPlanPage);
