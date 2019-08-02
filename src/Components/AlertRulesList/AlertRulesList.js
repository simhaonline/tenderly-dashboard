import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {Button, Icon, List, ListItem, Panel, PanelContent, PanelHeader} from "../../Elements";
import {SimpleLoader, EmptyState} from "..";
import {FeatureFlagTypes} from "../../Common/constants";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

class AlertRulesList extends Component {
    componentDidMount() {
        const {actions, projectId, areRulesLoaded} = this.props;

        if (!areRulesLoaded) {
            actions.fetchAlertRulesForProject(projectId);
        }
    }

    render() {
        const {areRulesLoaded, rules, projectId} = this.props;

        return (
            <Panel>
                <PanelHeader>
                    <h3>Alerts</h3>
                    <div className="MarginLeftAuto">
                        {areRulesLoaded && !!rules.length && <Button size="small" to={`/project/${projectId}/alerts/rules/create`}>
                            <Icon icon="plus"/>
                            <span>New Alert</span>
                        </Button>}
                    </div>
                </PanelHeader>
                <PanelContent>
                    {!areRulesLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {areRulesLoaded && !!rules.length && <div className="ActiveRules">
                        <List>
                            {rules.map(rule => <ListItem key={rule.id} className="DisplayFlex" to={`/project/${projectId}/alerts/rules/${rule.id}`}>
                                <div>
                                    <span className="SemiBoldText">{rule.name}</span>
                                </div>
                                <div>
                                    <span className="MutedText">{rule.description}</span>
                                </div>
                                <div>
                                    {rule.enabled && <span className="SuccessText">Enabled</span>}
                                    {!rule.enabled && <span className="DangerText">Disabled</span>}
                                </div>
                            </ListItem>)}
                        </List>
                    </div>}
                    {areRulesLoaded && !rules.length && <div>
                        <EmptyState icon="alerting" title="Setup Alerting for your Contracts" description={<span>
                            Setup alerts and be notified the moment events like <span className="SemiBoldText">transaction failures</span>, <span className="SemiBoldText">method calls</span> or <span className="SemiBoldText">blacklisted callers</span> happen on any of your Smart Contracts.
                        </span>} renderActions={() => <Fragment>
                            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                                <Button color="secondary" width={160} outline to={`/project/${projectId}/alerts/rules/templates`}>
                                    <span>Browse Templates</span>
                                </Button>
                            </FeatureFlag>
                            <Button color="secondary" width={160} to={`/project/${projectId}/alerts/rules/create`}>
                                <span>Setup an Alert</span>
                            </Button>
                        </Fragment>}/>
                    </div>}
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {projectId}}} = ownProps;

    return {
        projectId,
        rules: getAlertRulesForProject(state, projectId),
        areRulesLoaded: areAlertRulesLoadedForProject(state, projectId),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertRulesList);
