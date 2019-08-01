import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";

import {Button, Icon, Panel, PanelContent, PanelHeader} from "../../Elements";
import {SimpleLoader} from "..";

class EditAlertRuleForm extends Component {
    componentDidMount() {
        const {ruleId, projectId, isRuleLoaded, actions} = this.props;

        if (!isRuleLoaded) {
            actions.fetchAlertRuleForProject(projectId, ruleId);
        }
    }

    render() {
        const {isRuleLoaded, rule, projectId} = this.props;

        return (
            <Panel>
                <PanelHeader>
                    <h3>
                        <Link to={`/project/${projectId}/alerts/rules`}>Rules</Link>
                        {isRuleLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
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
                    {!isRuleLoaded && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {isRuleLoaded && !!rule && <div>
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
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {ruleId, projectId}}} = ownProps;

    return {
        projectId,
        ruleId,
        rule: getAlertRule(state, ruleId),
        isRuleLoaded: isAlertRuleLoaded(state, ruleId),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditAlertRuleForm);
