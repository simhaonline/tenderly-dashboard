import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import {AlertRulesList, AlertRuleView, CreateAlertRule, AlertTemplates, EditAlertRule} from "..";

class ProjectAlertRules extends Component {
    render() {
        return (
            <Switch>
                <Route path={`/project/:projectId/alerts/rules`} exact component={AlertRulesList}/>
                <Route path={`/project/:projectId/alerts/rules/templates`} exact component={AlertTemplates}/>
                <Route path={`/project/:projectId/alerts/rules/create`} exact component={CreateAlertRule}/>
                <Route path={`/project/:projectId/alerts/rules/:ruleId`} exact component={AlertRuleView}/>
                <Route path={`/project/:projectId/alerts/rules/:ruleId/edit`} exact component={EditAlertRule}/>
            </Switch>
        );
    }
}

export default ProjectAlertRules;
