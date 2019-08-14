import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import _ from "lodash";

import {FeatureFlagTypes} from "../../Common/constants";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {
    Button, Dropdown, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Icon,
    List,
    ListItem,
    Panel,
    PanelContent,
    PanelHeader
} from "../../Elements";
import {SimpleLoader, EmptyState, FeatureFlag} from "..";

import './AlertRulesList.scss';

class AlertRulesList extends Component {
    componentDidMount() {
        const {actions, projectId, areRulesLoaded} = this.props;

        if (!areRulesLoaded) {
            actions.fetchAlertRulesForProject(projectId);
        }
    }

    /**
     * @param {AlertRule} rule
     */
    toggleAlertRule = (rule) => {
        const {projectId, actions} = this.props;

        const updatedRule = rule.update({
            enabled: !rule.enabled,
        });

        actions.updateAlertRuleForProject(projectId, updatedRule);
    };

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
                            {_.sortBy(rules, 'createdAt').map(rule => <ListItem key={rule.id} className="ActiveRules__Rule" to={`/project/${projectId}/alerts/rules/${rule.id}`} selectable>
                                <div className="ActiveRules__Rule__Info">
                                    <div className="SemiBoldText ActiveRules__Rule__Info__Name">{rule.name}</div>
                                    {!!rule.description && <div className="MutedText ActiveRules__Rule__Info__Description">{rule.description}</div>}
                                </div>
                                <div className="ActiveRules__Rule__Status SemiBoldText">
                                    {rule.enabled && <span className="SuccessText">Enabled</span>}
                                    {!rule.enabled && <span className="WarningText">Disabled</span>}
                                </div>
                                <div className="ActiveRules__Rule__More">
                                    <Dropdown>
                                        <DropdownToggle tag="div" className="Dropdown__Toggle">
                                            <Icon icon="more-vertical" className="MoreIcon"/>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <Link to={`/project/${projectId}/alerts/rules/${rule.id}`}>
                                                <DropdownItem>View Alert</DropdownItem>
                                            </Link>
                                            <DropdownItem onClick={() => this.toggleAlertRule(rule)}>
                                                {rule.enabled && <span>Disable Alert</span>}
                                                {!rule.enabled && <span>Enable Alert</span>}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
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
