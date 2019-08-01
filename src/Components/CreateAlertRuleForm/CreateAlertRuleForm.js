import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Link} from "react-router-dom";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {AlertRuleExpressionParameterTypes, AlertRuleExpressionTypes} from "../../Common/constants";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {areProjectContractsLoaded} from "../../Common/Selectors/ProjectSelectors";
import {AlertRuleExpression} from "../../Core/models";

import {Button, Card, Icon, Input, Panel, PanelContent, PanelDivider, PanelHeader, Dialog, List, ListItem} from "../../Elements";
import {AlertRuleExpressionForm, NetworkTag} from "../index";

import './CreateAlertRuleForm.scss';

class SimpleAlertRuleAction extends Component {
    render() {
        const {icon, label, description, onClick, selected} = this.props;

        return (
            <Card color="light" className="SimpleAlertRuleAction" selectable selected={selected} onClick={onClick}>
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
            <div className="SimpleAlertRuleStep">
                <div className="SimpleAlertRuleStep__Heading" onClick={onClick}>
                    <div className={classNames(
                        "SimpleAlertRuleStep__StepIcon",
                        {
                            "SimpleAlertRuleStep__StepIcon--Success": finished,
                        }
                    )}>
                        {!finished && <span>{stepNumber}</span>}
                        {finished && <Icon icon="check"/>}
                    </div>
                    <div className="SimpleAlertRuleStep__StepInfo">
                        <h5>{label}</h5>
                        <p className="MutedText">{description}</p>
                    </div>
                </div>
                {open && <div>
                    <div className="SimpleAlertRuleStep__Options">
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
            currentStep: 1,
            parametersNeeded: false,
            selectedContract: null,
            alertTarget: null,
            alertType: null,
            alertParameters: null,
            alertDestinations: null,
            expressions: [],
        }
    }

    componentDidMount() {
        const {projectId, contractActions, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            contractActions.fetchContractsForProject(projectId);
        }
    }

    goToStep = (stepNumber) => {
        this.setState({
            currentStep: stepNumber,
        });
    };

    getAlertTypeDescription = () => {
        const {alertType} = this.state;

        switch (alertType) {
            case 'success_tx':
                return 'Alert every time a successful transaction happens';
            case 'failed_tx':
                return 'Alert every time a transaction failed';
            case 'whitelisted_callers':
                return 'Alert whenever a not whitelisted address calls a contract';
            case 'blacklisted_callers':
                return 'Alert whenever a blacklisted address calls a contract';
            default:
                return 'Select an alert trigger type';
        }
    };

    getAlertTargetDescription = () => {
        const {alertTarget, selectedContract} = this.state;
        const {contracts, projectId} = this.props;

        switch (alertTarget) {
            case 'contract':
                return `Contract: ${selectedContract.name} (${selectedContract.address})`;
            case 'project':
                return `All contracts in the ${projectId} project (total of ${contracts.length} contracts)`;
            default:
                return 'Select contracts for which the alert will be triggered'
        }
    };

    selectAlertType = (type) => {
        const {alertTarget} = this.state;

        const expressionData = {};

        let parametersNeeded = false;
        let nextStep = 2;

        switch (type) {
            case 'success_tx':
                expressionData.type = AlertRuleExpressionTypes.TRANSACTION_STATUS;
                expressionData.parameters = {
                    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: true,
                };
                break;
            case 'failed_tx':
                expressionData.type = AlertRuleExpressionTypes.TRANSACTION_STATUS;
                expressionData.parameters = {
                    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: false,
                };
                break;
            case 'whitelisted_callers':
                expressionData.type = AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES;
                parametersNeeded = true;
                break;
            case 'blacklisted_callers':
                expressionData.type = AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES;
                parametersNeeded = true;
                break;
            default:
                break;
        }

        if (alertTarget) {
            nextStep = parametersNeeded ? 3 : 4;
        }

        const expression = new AlertRuleExpression(expressionData);

        this.setState({
            parametersNeeded,
            alertType: type,
            expressions: [
                ...this.state.expressions.filter(e => [AlertRuleExpressionTypes.NETWORK, AlertRuleExpressionTypes.CONTRACT_ADDRESS].includes(e.type)),
                expression,
            ],
        }, () => this.goToStep(nextStep));
    };

    /**
     * @param {'contract'|'project'} target
     * @param {Contract} [contract]
     */
    selectAlertTarget = (target, contract) => {
        const {parametersNeeded, expressions} = this.state;

        const newExpressions = [];
        let selectedContract = null;

        if (target === 'contract' && contract) {
            const contractExpression = new AlertRuleExpression({
                type: AlertRuleExpressionTypes.CONTRACT_ADDRESS,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESS]: contract.address,
                },
            });

            const networkExpression = new AlertRuleExpression({
                type: AlertRuleExpressionTypes.NETWORK,
                parameters: {
                    [AlertRuleExpressionParameterTypes.NETWORK_ID]: contract.network,
                },
            });

            selectedContract = contract;

            newExpressions.push(contractExpression);
            newExpressions.push(networkExpression);

            this.closeContractModel();
        }

        this.setState({
            alertTarget: target,
            selectedContract,
            expressions: [
                ...expressions.filter(e => ![AlertRuleExpressionTypes.NETWORK, AlertRuleExpressionTypes.CONTRACT_ADDRESS].includes(e.type)),
                ...newExpressions,
            ],
        }, () => this.goToStep(parametersNeeded ? 3 : 4));
    };

    openContractModel = () => {
        this.setState({
            contractModelOpen: true,
        });
    };

    closeContractModel = () => {
        this.setState({
            contractModelOpen: false,
        });
    };

    render() {
        const {projectId, contracts} = this.props;
        const {currentMode, expressions, parametersNeeded, currentStep, alertType, alertTarget, contractModelOpen, alertDestinations} = this.state;

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
                        <SimpleAlertRuleStep label="Trigger Condition" description={this.getAlertTypeDescription()} finished={!!alertType} open={currentStep === 1} stepNumber="1" onClick={() => this.goToStep(1)}>
                            <SimpleAlertRuleAction onClick={() => this.selectAlertType('success_tx')} selected={alertType === 'success_tx'} icon="check-circle" label="Successful Transaction" description="Triggers whenever a successful transaction happens"/>
                            <SimpleAlertRuleAction onClick={() => this.selectAlertType('failed_tx')} selected={alertType === 'failed_tx'} icon="x-circle" label="Failed Transaction" description="Triggers whenever a failed transactions happens"/>
                            <SimpleAlertRuleAction onClick={() => this.selectAlertType('whitelisted_callers')} selected={alertType === 'whitelisted_callers'} icon="eye" label="Whitelisted Callers" description="Triggers whenever a contract that is not whitelisted calls one of your contracts"/>
                            <SimpleAlertRuleAction onClick={() => this.selectAlertType('blacklisted_callers')} selected={alertType === 'blacklisted_callers'} icon="eye-off" label="Blacklisted Callers" description="Triggers whenever a contract from this list calls one of your contracts"/>
                        </SimpleAlertRuleStep>
                        <SimpleAlertRuleStep label="Alert Target" description={this.getAlertTargetDescription()} stepNumber="2" open={currentStep === 2} finished={!!alertTarget} onClick={() => this.goToStep(2)}>
                            <SimpleAlertRuleAction onClick={this.openContractModel} selected={alertTarget === 'contract'} icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                            <SimpleAlertRuleAction onClick={() => this.selectAlertTarget('project')} selected={alertTarget === 'project'} icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                        </SimpleAlertRuleStep>
                        {parametersNeeded && <SimpleAlertRuleStep label="Parameters" stepNumber="3" open={currentStep === 3} onClick={() => this.goToStep(3)}>
                            <Button>
                                <span>Next</span>
                            </Button>
                        </SimpleAlertRuleStep>}
                        <SimpleAlertRuleStep label="Destinations" stepNumber={parametersNeeded ? 4: 3} open={currentStep === 4} onClick={() => this.goToStep(4)}>

                        </SimpleAlertRuleStep>
                        <Dialog open={contractModelOpen} onClose={this.closeContractModel}>
                            <List>
                                {contracts.map(contract => <ListItem key={contract.getUniqueId()} onClick={() => this.selectAlertTarget('contract', contract)}>
                                    {contract.name}
                                    {contract.address}
                                    <NetworkTag network={contract.network}/>
                                </ListItem>)}
                            </List>
                        </Dialog>
                    </div>}
                    <div className="MarginTop4">
                        <Button type="submit" disabled={!alertTarget || !alertType || !alertDestinations}>
                            <span>Create Alert</span>
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
        contracts: getContractsForProject(state, projectId),
        contractsLoaded: areProjectContractsLoaded(state, projectId),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAlertRuleForm);
