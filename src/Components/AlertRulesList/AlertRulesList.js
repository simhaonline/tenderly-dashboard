import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import _ from "lodash";

import Intercom from "../../Utils/Intercom";
import Analytics from "../../Utils/Analytics";

import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {
    Button, Dropdown, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Icon, LinkButton,
    List,
    ListItem,
    Panel,
    PanelContent,
    PanelHeader
} from "../../Elements";
import {SimpleLoader, EmptyState, FeatureFlag, ExampleProjectInfoModal} from "..";

import './AlertRulesList.scss';
import {getProject, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

class AlertRulesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createProjectModalOpen: false,
        };
    }

    componentDidMount() {
        const {actions, project, areRulesLoaded} = this.props;

        if (!areRulesLoaded && project.type !== ProjectTypes.DEMO) {
            actions.fetchAlertRulesForProject(project);
        }
    }

    /**
     * @param {AlertRule} rule
     */
    toggleAlertRule = (rule) => {
        const {project, actions} = this.props;

        const updatedRule = rule.update({
            enabled: !rule.enabled,
        });

        actions.updateAlertRuleForProject(project, updatedRule);
    };

    handleOpenExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: true,
        });
    };

    handleCloseExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: false,
        });
    };

    render() {
        const {areRulesLoaded, rules, projectId, project} = this.props;
        const {createProjectModalOpen} = this.state;

        const isDemoProject = project.type === ProjectTypes.DEMO;

        const pageLoaded = areRulesLoaded || isDemoProject;

        return (
            <Panel>
                <PanelHeader>
                    <h3>Alerts</h3>
                    <div className="MarginLeftAuto">
                        <LinkButton onClick={() => Intercom.openNewConversation('Suggestion/feedback for alerting:\n')}>Have suggestions or feedback?</LinkButton>
                    </div>
                </PanelHeader>
                <PanelContent>
                    {!pageLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {pageLoaded && !!rules.length && <div className="ActiveRules">
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
                    {pageLoaded && !rules.length && <div>
                        <EmptyState icon="alerting" title="Setup Alerting for your Contracts" description={<span>
                            Setup alerts and be notified the moment events like <span className="SemiBoldText">transaction failures</span>, <span className="SemiBoldText">method calls</span> or <span className="SemiBoldText">blacklisted callers</span> happen on any of your Smart Contracts.
                        </span>} renderActions={() => <Fragment>
                            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                                <Button color="secondary" width={160} outline to={`/project/${projectId}/alerts/rules/templates`}>
                                    <span>Browse Templates</span>
                                </Button>
                            </FeatureFlag>
                            {!isDemoProject && <Button color="secondary" width={160} to={`/project/${projectId}/alerts/rules/create`} onClick={() => Analytics.trackEvent('create_alert_button_clicked')}>
                                <span>Setup an Alert</span>
                            </Button>}
                            {isDemoProject && <Fragment>
                                <Button color="secondary" width={160} onClick={this.handleOpenExampleProjectInfoModal}>
                                    <span>Setup an Alert</span>
                                </Button>
                                <ExampleProjectInfoModal header="Example Project" description="This is just an example project to illustrate what the platform can do. If you wish to setup alerting for your contracts first create a project and your contracts to that project." onClose={this.handleCloseExampleProjectInfoModal} open={createProjectModalOpen}/>
                            </Fragment>}
                        </Fragment>}/>
                    </div>}
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        projectId: project.id,
        project,
        rules: getAlertRulesForProject(state, project.id),
        areRulesLoaded: areAlertRulesLoadedForProject(state, project),
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
