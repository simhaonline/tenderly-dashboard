import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";
import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {
    areNotificationDestinationsLoaded, getNotificationDestinations, getOtherNotificationDestinationsForRule,
} from "../../Common/Selectors/NotificationSelectors";
import {getUniqueNetworksForContracts} from "../../Common/Selectors/NetworkSelectors";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Panel, PanelHeader, PanelContent, Icon} from "../../Elements";
import {AlertRuleBuilder, SimpleLoader} from "..";

class EditAlertRule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectBackToRule: false,
        };
    }

    async componentDidMount() {
        const {ruleId, project, isRuleLoaded, actions, notificationActions, contractActions, destinationsLoaded, areContractsLoaded} = this.props;


        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
        }

        if (!isRuleLoaded) {
            const response = await actions.fetchAlertRuleForProject(project, ruleId);

            if (!response.success) {
                this.setState({
                    errorFetching: true,
                });
            }
        }

        if (!areContractsLoaded) {
            contractActions.fetchContractsForProject(project);
        }
    }

    handleEditingCancel = () => {
        const {history, project, rule} = this.props;

        history.push(`/${project.owner}/${project.slug}/alerts/rules/${rule.id}`);
    };

    /**
     * @param {SimpleAlertRuleGeneralInformation} general
     * @param {{AlertRuleExpression[]}} expressions
     * @param {string[]} destinations
     */
    handleEditSubmit = async (general, expressions, destinations) => {
        const {project, rule, actions} = this.props;

        const updatedRule = rule.update({
            ...general,
            expressions,
            deliveryChannels: destinations,
        });

        const response = await actions.updateAlertRuleForProject(project, updatedRule);

        if (response.success) {
            this.setState({
                redirectBackToRule: true,
            });
        }
    };

    render() {
        const {rule, contracts, networks, destinations, otherDestinations, areContractsLoaded, destinationsLoaded, project, isRuleLoaded, initialTab} = this.props;
        const {redirectBackToRule} = this.state;

        const pageLoaded = areContractsLoaded && destinationsLoaded && isRuleLoaded;

        if (redirectBackToRule) {
            return <Redirect to={`/${project.owner}/${project.slug}/alerts/rules/${rule.id}`}/>
        }

        return (
            <Panel>
                <PanelHeader>
                    <h3>
                        {pageLoaded && <Link to={`/${project.owner}/${project.slug}/alerts/rules/${rule.id}`}>Back to Alert</Link>}
                        {pageLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
                        <span>Edit Alert</span>
                    </h3>
                </PanelHeader>
                <PanelContent>
                    {!pageLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {pageLoaded && <div>
                        <AlertRuleBuilder initialStep={initialTab} initialRule={rule} contracts={contracts} project={project} onSubmit={this.handleEditSubmit}
                                          networks={networks} destinations={destinations} otherDestinations={otherDestinations} onCancel={this.handleEditingCancel}/>
                    </div>}
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {ruleId, slug, username}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const initialTab = searchParams.get('tab');

    const project = getProjectBySlugAndUsername(state, slug, username);

    const rule = getAlertRule(state, ruleId);
    const contracts = getContractsForProject(state, project.id);

    return {
        project,
        contracts,
        networks: getUniqueNetworksForContracts(contracts),
        areContractsLoaded: areProjectContractsLoaded(state, project.id),
        ruleId,
        rule,
        initialTab,
        isRuleLoaded: isAlertRuleLoaded(state, ruleId),
        destinations: getNotificationDestinations(state),
        otherDestinations: getOtherNotificationDestinationsForRule(state, ruleId),
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
