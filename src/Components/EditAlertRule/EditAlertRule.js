import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";
import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {
    areNotificationDestinationsLoaded, getNotificationDestinations,
} from "../../Common/Selectors/NotificationSelectors";
import {getUniqueNetworksForContracts} from "../../Common/Selectors/NetworkSelectors";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Panel, PanelHeader, PanelContent} from "../../Elements";
import {AlertRuleBuilder, SimpleLoader} from "..";

class EditAlertRule extends Component {
    async componentDidMount() {
        const {ruleId, projectId, isRuleLoaded, actions, notificationActions, contractActions, destinationsLoaded, areContractsLoaded} = this.props;


        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
        }

        if (!isRuleLoaded) {
            const response = await actions.fetchAlertRuleForProject(projectId, ruleId);

            if (!response.success) {
                this.setState({
                    errorFetching: true,
                });
            }
        }

        if (!areContractsLoaded) {
            contractActions.fetchContractsForProject(projectId);
        }
    }

    render() {
        const {rule, contracts, networks, destinations, areContractsLoaded, destinationsLoaded, isRuleLoaded, initialTab} = this.props;

        const pageLoaded = areContractsLoaded && destinationsLoaded && isRuleLoaded;

        return (
            <Panel>
                <PanelHeader>
                    <h3>Edit Alert</h3>
                </PanelHeader>
                <PanelContent>
                    {!pageLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {pageLoaded && <div>
                        edit alert rule
                        <AlertRuleBuilder initialStep={initialTab} initialRule={rule} contracts={contracts}
                                          networks={networks} destinations={destinations}/>
                    </div>}
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {ruleId, projectId}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const initialTab = searchParams.get('tab');

    const rule = getAlertRule(state, ruleId);
    const contracts = getContractsForProject(state, projectId);

    return {
        projectId,
        project: getProject(state, projectId),
        contracts,
        networks: getUniqueNetworksForContracts(contracts),
        areContractsLoaded: areProjectContractsLoaded(state, projectId),
        ruleId,
        rule,
        initialTab,
        isRuleLoaded: isAlertRuleLoaded(state, ruleId),
        destinations: getNotificationDestinations(state),
        destinationsLoaded: areNotificationDestinationsLoaded(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditAlertRule);
