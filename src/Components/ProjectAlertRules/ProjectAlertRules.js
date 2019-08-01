import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import {AlertRulesList, EditAlertRuleForm, CreateAlertRuleForm, AlertTemplates} from "..";

class ProjectAlertRules extends Component {
    render() {
        return (
            <Switch>
                <Route path={`/project/:projectId/alerts/rules`} exact component={AlertRulesList}/>
                <Route path={`/project/:projectId/alerts/rules/templates`} exact component={AlertTemplates}/>
                <Route path={`/project/:projectId/alerts/rules/create`} exact component={CreateAlertRuleForm}/>
                <Route path={`/project/:projectId/alerts/rules/:ruleId`} component={EditAlertRuleForm}/>
            </Switch>
        );
    }
}

export default ProjectAlertRules;
