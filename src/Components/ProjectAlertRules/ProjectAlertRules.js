import React, {Component} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {FeatureFlagTypes} from "../../Common/constants";

import * as alertingActions from '../../Core/Alerting/Alerting.actions';

import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {Button, Icon, Panel, PanelContent, PanelHeader, PanelDivider, Input, List, ListItem, Card} from "../../Elements";
import {SimpleLoader, AlertRuleExpressionForm, FeatureFlag} from "..";

class ProjectAlertRules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advancedMode: false,
            alertTarget: null,
            alertRuleType: null,
            alertRuleParameter: null,
            expressions: [
                null
            ],
        };
    }

    componentDidMount() {
        const {actions, projectId, areRulesLoaded} = this.props;

        if (!areRulesLoaded) {
            actions.fetchAlertRulesForProject(projectId);
        }
    }

    openCreateRule = () => {
        this.setState({
            creatingRule: true,
        });
    };

    handleCreateRuleSubmit = () => {

    };

    addExpression = () => {
        this.setState({
            expressions: [
                ...this.state.expressions,
                null,
            ],
        });
    };

    /**
     * @param {number} index
     */
    removeExpression = (index) => {};

    /**
     * @param {AlertRuleExpression} expression
     * @param {number} index
     */
    handleExpressionUpdate = (expression, index) => {
        const newExpressions = [...this.state.expressions];

        newExpressions.splice(index, 1, expression);

        this.setState({
            expressions: newExpressions,
        })
    };

    render() {
        const {projectId, rules, areRulesLoaded} = this.props;
        const {expressions, alertTarget, alertRuleType, alertRuleParameter} = this.state;

        const currentActiveExpressionTypes = expressions.filter(e => !!e).map(e => e.type);

        return (
            <Switch>
                <Route path={`/project/${projectId}/alerts/rules`} exact render={() => <Panel>
                    <PanelHeader>
                        <h3>Rules</h3>
                        <div className="MarginLeftAuto">
                            {areRulesLoaded && !!rules.length && <Button size="small" to={`/project/${projectId}/alerts/rules/create`}>
                                <Icon icon="plus"/>
                                <span>Create Rule</span>
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
                            Create alert noob
                        </div>}
                    </PanelContent>
                </Panel>}/>
                <Route path={`/project/${projectId}/alerts/rules/create`} exact render={() => <Panel>
                    <PanelHeader>
                        <h3>
                            <Link to={`/project/${projectId}/alerts/rules`}>Rules</Link>
                            <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>
                            <span>Create Rule</span>
                        </h3>
                        <div className="MarginLeftAuto">`
                            <Button size="small" outline to={`/project/${projectId}/alerts/rules`}>
                                <Icon icon="arrow-left"/>
                                <span>Back to Rules</span>
                            </Button>
                        </div>
                    </PanelHeader>
                    <PanelContent>
                        <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                            <div className="MarginBottom4">
                                <Input label="Name"/>
                                <Input label="Description"/>
                                <h4>Conditions</h4>
                                <PanelDivider/>
                                <p>This alert will be triggered if the following conditions are met:</p>
                                {expressions.map((expression, index) => {
                                    return (
                                        <div key={index}>
                                            {index !== 0 && <p className="MutedText TextAlignCenter MarginBottom1 MarginTop1">and</p>}
                                            <Card color="light">
                                                <AlertRuleExpressionForm onChange={expression => this.handleExpressionUpdate(expression, index)}
                                                                         disabledOptions={currentActiveExpressionTypes.filter(e => {
                                                                             if (!expression) {
                                                                                 return true;
                                                                             }

                                                                             return e !== expression.type;
                                                                         })}/>
                                            </Card>
                                        </div>
                                    );
                                })}
                                <div className="MarginTop3 DisplayFlex JustifyContentCenter">
                                    <Button onClick={this.addExpression} outline>
                                        <Icon icon="plus"/>
                                        <span>Add another condition</span>
                                    </Button>
                                </div>
                            </div>
                        </FeatureFlag>
                        <div>
                            <div>
                                <div>
                                    <div>1</div>
                                </div>
                                <div>
                                    <div>
                                        <h5>Select alert target</h5>
                                        {!!alertTarget && <p className="MutedText">
                                            {alertTarget === 'project_wide' && <span>Project: {projectId}</span>}
                                            {alertTarget !== 'project_wide' && <span>Contract: {alertTarget}</span>}
                                        </p>}
                                    </div>
                                    <div>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="file-text"/>
                                            <h5>Contract</h5>
                                        </Card>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="project"/>
                                            <h5>Project</h5>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>2</div>
                                </div>
                                <div>
                                    <div>
                                        <h5>Select condition</h5>
                                    </div>
                                    <div>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="layers"/>
                                            <h5>Transaction Status</h5>
                                        </Card>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="maximize-2"/>
                                            <h5>Transaction Type</h5>
                                        </Card>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="eye"/>
                                            <h5>Whitelisted Callers</h5>
                                        </Card>
                                        <Card color="light" selectable selected={false}>
                                            <Icon icon="eye-off"/>
                                            <h5>Blacklisted Callers</h5>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>3</div>
                                </div>
                                <div>
                                    <div>
                                        <h5>Set condition parameters</h5>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button type="submit">
                                <span>Create</span>
                            </Button>
                            <Button outline onClick={this.backToRulesList}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </PanelContent>
                </Panel>}/>
                <Route path={`/project/${projectId}/alerts/rules/:ruleId`} render={(routeParams) => {
                    const {match: {params: {ruleId}}} = routeParams;

                    const rule = rules.find(r => r.id === ruleId);

                    return (
                        <Panel>
                            <PanelHeader>
                                <h3>
                                    <Link to={`/project/${projectId}/alerts/rules`}>Rules</Link>
                                    {areRulesLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
                                    {!!rule && <span>{rule.name}</span>}
                                </h3>
                                <div className="MarginLeftAuto">`
                                    <Button size="small" outline to={`/project/${projectId}/alerts/rules`}>
                                        <Icon icon="arrow-left"/>
                                        <span>Back to Rules</span>
                                    </Button>
                                </div>
                            </PanelHeader>
                            <PanelContent>
                                {!areRulesLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                                    <SimpleLoader/>
                                </div>}
                                {areRulesLoaded && !!rule && <div>
                                    <div>
                                        {rule.id}
                                    </div>
                                    <div>
                                        {rule.name}
                                    </div>
                                    <div>
                                        {rule.description}
                                    </div>
                                    <div>
                                        {rule.enabled}
                                    </div>
                                </div>}
                            </PanelContent>
                        </Panel>
                    )
                }}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const projectId = ownProps.projectId;

    return {
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
    mapDispatchToProps,
)(ProjectAlertRules);
