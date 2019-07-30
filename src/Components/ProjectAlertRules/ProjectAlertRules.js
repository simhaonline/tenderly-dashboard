import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as alertingActions from '../../Core/Alerting/Alerting.actions';

import {Button, Icon, Panel, PanelContent, PanelHeader, Form, List, ListItem} from "../../Elements";
import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";
import {SimpleLoader} from "..";

class ProjectAlertRules extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        const {projectId, rules, areRulesLoaded} = this.props;

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
                                {rules.map(rule => <ListItem key={rule.id}>
                                    This is a rule
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
                        <h3>Create Rule</h3>
                        <div className="MarginLeftAuto">`
                            <Button size="small" outline to={`/project/${projectId}/alerts/rules`}>
                                <Icon icon="arrow-left"/>
                                <span>Back to Rules</span>
                            </Button>
                        </div>
                    </PanelHeader>
                    <PanelContent>
                        <Form onSubmit={this.handleCreateRuleSubmit}>
                            <div>
                                <Button type="submit">
                                    <span>Create</span>
                                </Button>
                                <Button outline onClick={this.backToRulesList}>
                                    <span>Cancel</span>
                                </Button>
                            </div>
                        </Form>
                    </PanelContent>
                </Panel>}/>
                <Route path={`/project/${projectId}/alerts/rules/:ruleId`} render={() => <div>
                    single rule
                </div>}/>
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
