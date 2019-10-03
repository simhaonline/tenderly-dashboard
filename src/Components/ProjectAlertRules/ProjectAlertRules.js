import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import {AlertRulesList, AlertRuleView, CreateAlertRule, AlertTemplates, EditAlertRule} from "..";

class ProjectAlertRules extends Component {
    render() {
        return (
            <Switch>
                <Route path={`/:username/:slug/alerts/rules`} exact component={AlertRulesList}/>
                <Route path={`/:username/:slug/alerts/rules/templates`} exact component={AlertTemplates}/>
                <Route path={`/:username/:slug/alerts/rules/create`} exact component={CreateAlertRule}/>
                <Route path={`/:username/:slug/alerts/rules/:ruleId`} exact component={AlertRuleView}/>
                <Route path={`/:username/:slug/alerts/rules/:ruleId/edit`} exact component={EditAlertRule}/>
            </Switch>
        );
    }
}

export default ProjectAlertRules;
