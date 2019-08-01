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

import {Button, Card, Icon, Input, Panel, PanelContent, PanelDivider, PanelHeader, Dialog, List, ListItem, TextArea} from "../../Elements";
import {AlertRuleExpressionForm, NetworkTag} from "../index";

import './CreateAlertRuleForm.scss';
import {isValidAddress} from "../../Utils/Ethereum";
import Blockies from "react-blockies";

class SimpleAlertRuleAction extends Component {
    render() {
        const {icon, label, description, onClick, selected} = this.props;

        return (
            <Card color="light" className="SimpleAlertRuleAction" selectable selected={selected} onClick={onClick}>
                <Icon icon={icon} className="SimpleAlertRuleAction__Icon"/>
                <h5 className="SimpleAlertRuleAction__Label">{label}</h5>
                <p className="SimpleAlertRuleAction__Description">{description}</p>
            </Card>
        )
    }
}

class SimpleAlertRuleStep extends Component {
    render() {
        const {open, stepNumber, finished, label, description, onClick, children} = this.props;

        return (
            <div className="SimpleAlertRuleStep">
                <div className={classNames(
                    "SimpleAlertRuleStep__Heading",
                    {
                        "SimpleAlertRuleStep__Heading--Finished": finished,
                    }
                )} onClick={onClick}>
                    <div className={classNames(
                        "SimpleAlertRuleStep__StepIcon",
                        {
                            "SimpleAlertRuleStep__StepIcon--Finished": finished,
                        },
                    )}>
                        {!finished && <span>{stepNumber}</span>}
                        {finished && <Icon icon="check"/>}
                    </div>
                    <div className="SimpleAlertRuleStep__StepInfo">
                        <h5 className="SimpleAlertRuleStep__StepInfo__Heading">{label}</h5>
                        <p className="SimpleAlertRuleStep__StepInfo__Description">{description}</p>
                    </div>
                </div>
                {open && <div className="SimpleAlertRuleStep__Body">
                    <div className="SimpleAlertRuleStep__Body__Divider"/>
                    <div className="SimpleAlertRuleStep__Body__Content">
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
            parametersSet: false,
            addressesValue: '',
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

    applyParameters = () => {
        const {alertType, addressesValue, expressions} = this.state;

        switch (alertType) {
            case 'whitelisted_callers':
            case 'blacklisted_callers':
                const validAddresses = addressesValue.split(/\n/g).filter(a => isValidAddress(a));

                const expression = expressions.find(e => [AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES, AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES].includes(e.type));

                console.log(expression, validAddresses);
                break;
        }
    };

    updateParameter = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const {projectId, contracts} = this.props;
        const {currentMode, expressions, parametersNeeded, parametersSet, currentStep, alertType, alertTarget, contractModelOpen, alertDestinations, addressesValue} = this.state;

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
                        {parametersNeeded && <SimpleAlertRuleStep label="Parameters" finished={parametersSet} stepNumber="3" open={currentStep === 3} onClick={() => this.goToStep(3)}>

                            {['whitelisted_callers', 'blacklisted_callers'].includes(alertType) && <TextArea value={addressesValue} field="addressesValue" onChange={this.updateParameter} placeholder="Enter the list of contract addresses separated by new lines"/>}
                            <Button disabled={!addressesValue} onClick={this.applyParameters}>
                                <span>Apply</span>
                            </Button>
                        </SimpleAlertRuleStep>}
                        <SimpleAlertRuleStep label="Destinations" stepNumber={parametersNeeded ? 4: 3} open={currentStep === 4} onClick={() => this.goToStep(4)}>

                        </SimpleAlertRuleStep>
                        <Dialog open={contractModelOpen} onClose={this.closeContractModel}>
                            <List className="ContractPickerList">
                                {contracts.map(contract => <ListItem key={contract.getUniqueId()} onClick={() => this.selectAlertTarget('contract', contract)} className="ContractPickerList__Item">
                                    <Blockies
                                        seed={contract.address}
                                        size={8}
                                        scale={4.5}
                                        className="ContractPickerList__Item__Blockie"
                                    />
                                    <div className="ContractPickerList__Item__Info">
                                        <div className="ContractPickerList__Item__Name">{contract.name}</div>
                                        <div className="ContractPickerList__Item__Address">{contract.address}</div>
                                    </div>
                                    <div className="ContractPickerList__Item__Network">
                                        <NetworkTag network={contract.network}/>
                                    </div>
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
