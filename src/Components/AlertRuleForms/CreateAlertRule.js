import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {
    areNotificationDestinationsLoaded, getNotificationDestinations,
} from "../../Common/Selectors/NotificationSelectors";
import {getUniqueNetworksForContracts} from "../../Common/Selectors/NetworkSelectors";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Panel, PanelHeader, PanelContent, Icon} from "../../Elements";
import {AlertRuleBuilder, SimpleLoader} from "..";
import {Link} from "react-router-dom";

class CreateAlertRule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectBackToRule: false,
        };
    }

    async componentDidMount() {
        const {project, notificationActions, contractActions, destinationsLoaded, areContractsLoaded} = this.props;


        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
        }

        if (!areContractsLoaded) {
            contractActions.fetchContractsForProject(project);
        }
    }

    handleCreateCancel = () => {
        const {history, project} = this.props;

        history.push(`/project/${project.id}/alerts/rules`);
    };

    /**
     * @param {SimpleAlertRuleGeneralInformation} general
     * @param {{AlertRuleExpression[]}} expressions
     * @param {string[]} destinations
     */
    handleCreateSubmit = async (general, expressions, destinations) => {
        const {project, actions} = this.props;

        const response = await actions.createAlertRuleForProject(project.id, general, expressions, destinations);

        if (response.success) {
            this.setState({
                redirectToRule: response.data.id,
            });
        }
    };

    render() {
        const {contracts, networks, destinations, areContractsLoaded, destinationsLoaded, project} = this.props;
        const {redirectToRule} = this.state;

        const pageLoaded = areContractsLoaded && destinationsLoaded;

        if (redirectToRule) {
            return <Redirect to={`/${project.owner}/${project.slug}/alerts/rules/${redirectToRule}`}/>
        }

        return (
            <Panel>
                <PanelHeader>
                    <h3>
                        {pageLoaded && <Link to={`/${project.owner}/${project.slug}/alerts/rules`}>Alerts</Link>}
                        {pageLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
                        <span>Create Alert</span>
                    </h3>
                </PanelHeader>
                <PanelContent>
                    {!pageLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {pageLoaded && <div>
                        <AlertRuleBuilder contracts={contracts} project={project} onSubmit={this.handleCreateSubmit} skipGeneral
                                          networks={networks} destinations={destinations} onCancel={this.handleCreateCancel}/>
                    </div>}
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    const contracts = getContractsForProject(state, project.id);

    return {
        project,
        contracts,
        networks: getUniqueNetworksForContracts(contracts),
        areContractsLoaded: areProjectContractsLoaded(state, project.id),
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
)(CreateAlertRule);
