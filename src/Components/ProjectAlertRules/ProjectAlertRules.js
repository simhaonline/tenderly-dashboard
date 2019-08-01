import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import {AlertRulesList, EditAlertRuleForm, CreateAlertRuleForm} from "..";

class ProjectAlertRules extends Component {
    render() {
        return (
            <Switch>
                <Route path={`/project/:projectId/alerts/rules`} exact component={AlertRulesList}/>
                <Route path={`/project/:projectId/alerts/rules/create`} exact component={CreateAlertRuleForm}/>
                <Route path={`/project/:projectId/alerts/rules/:ruleId`} component={EditAlertRuleForm}/>
            </Switch>
        );
    }
}

export default ProjectAlertRules;
