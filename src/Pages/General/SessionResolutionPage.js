import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Plan, User} from "../../Core/models";
import {billingActions} from "../../Core/actions";

import {Button, LinkButton, Page} from "../../Elements";

class SessionResolutionPage extends Component {
    acceptGrandfatherPlan = async () => {
        const {billingActions, user, plan, onResolution} = this.props;

        const response = await billingActions.activatePlanForAccount(user, plan);

        console.log('asdasd');
        if (response.success) {
            onResolution();
        }
    };

    render() {
        const {user, plan} = this.props;

        console.log(user, plan);

        return (
            <Page wholeScreenPage>
                <div className="DisplayFlex FlexDirectionColumn AlignItemsCenter JustifyContentCenter">

                    <Button className="MarginBottom2" onClick={this.acceptGrandfatherPlan} color="secondary">Accept Grandfathering</Button>
                    <LinkButton>Decline, downgrade to the Free Version</LinkButton>
                </div>
            </Page>
        );
    }
}

SessionResolutionPage.propTypes = {
    user: PropTypes.instanceOf(User),
    plan: PropTypes.instanceOf(Plan),
};

const mapDispatchToProps = (dispatch) => {
    return {
        billingActions: bindActionCreators(billingActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(SessionResolutionPage);
