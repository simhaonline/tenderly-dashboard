import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Link} from "react-router-dom";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {Button, Card, Icon, Input, Panel, PanelContent, PanelDivider, PanelHeader} from "../../Elements";
import {AlertRuleExpressionForm} from "../index";

class SimpleAlertRuleAction extends Component {
    render() {
        const {icon, label, description, onClick} = this.props;

        return (
            <Card color="light" className="AlertRuleSetup__Options__Option" selectable selected={false} onClick={onClick}>
                <Icon icon={icon}/>
                <h5>{label}</h5>
                <p>{description}</p>
            </Card>
        )
    }
}

class SimpleAlertRuleStep extends Component {
    render() {
        const {open, stepNumber, finished, label, description, onClick, children} = this.props;

        return (
            <div className="AlertRuleSetup__Step">
                <div className="AlertRuleSetup__Heading" onClick={onClick}>
                    <div className={classNames(
                        "AlertRuleSetup__StepIcon",
                        {
                            "AlertRuleSetup__StepIcon--Success": finished,
                        }
                    )}>
                        {!finished && <span>{stepNumber}</span>}
                        {finished && <Icon icon="check"/>}
                    </div>
                    <div className="AlertRuleSetup__StepInfo">
                        <h5>{label}</h5>
                        <p className="MutedText">{description}</p>
                    </div>
                </div>
                {open && <div>
                    <div className="AlertRuleSetup__Options">
                        {children}
                    </div>
                </div>}
            </div>
        );
    }
}

class CreateAlertRuleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'simple',
            alertTarget: null,
            alertType: null,
            alertParameters: null,
            alertDestinations: null,
            expressions: [
                null,
            ],
        }
    }

    render() {
        const {projectId} = this.props;
        const {currentMode, expressions} = this.state;

        const currentActiveExpressionTypes = expressions.filter(e => !!e).map(e => e.type);

        return (
            <Panel className="CreateAlertRule">
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
                    {currentMode === 'advanced' && <div>
                        <div>
                            <Input label="Name"/>
                            <Input label="Description"/>
                        </div>
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
                    </div>}
                    {currentMode === 'simple' && <div className="AlertRuleSetup">
                        <SimpleAlertRuleStep label="Conditions" finished={true} open={false} stepNumber="1">
                            <SimpleAlertRuleAction icon="check-circle" label="Successful Transaction" description="Triggers whenever a successful transaction happens"/>
                            <SimpleAlertRuleAction icon="x-circle" label="Failed Transaction" description="Triggers whenever a failed transactions happens"/>
                            <SimpleAlertRuleAction icon="eye" label="Whitelisted Callers" description="Triggers whenever a contract that is not whitelisted calls one of your contracts"/>
                            <SimpleAlertRuleAction icon="eye-off" label="Blacklisted Callers" description="Triggers whenever a contract from this list calls one of your contracts"/>
                        </SimpleAlertRuleStep>
                        <SimpleAlertRuleStep label="Alert Target" stepNumber="2" open={true}>
                            <SimpleAlertRuleAction icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                            <SimpleAlertRuleAction icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                        </SimpleAlertRuleStep>
                        <SimpleAlertRuleStep label="Destinations" stepNumber="3" open={false}>

                        </SimpleAlertRuleStep>
                    </div>}
                    <div className="MarginTop4">
                        <Button type="submit">
                            <span>Create</span>
                        </Button>
                        <Button outline to={`/project/${projectId}/alerts/rules`}>
                            <span>Cancel</span>
                        </Button>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {projectId}}} = ownProps;

    return {
        projectId,
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
)(CreateAlertRuleForm);
