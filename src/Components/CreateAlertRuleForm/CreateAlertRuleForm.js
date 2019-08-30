import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Link, Redirect} from "react-router-dom";
import _ from 'lodash';
import Blockies from "react-blockies";

import Intercom from "../../Utils/Intercom";
import {isValidAddress} from "../../Utils/Ethereum";
import Analytics from "../../Utils/Analytics";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";

import {AlertRuleExpressionParameterTypes, AlertRuleExpressionTypes} from "../../Common/constants";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {areProjectContractsLoaded} from "../../Common/Selectors/ProjectSelectors";
import {
    areNotificationDestinationsLoaded,
    getNotificationDestinations
} from "../../Common/Selectors/NotificationSelectors";

import {AlertRuleExpression} from "../../Core/models";

import {
    Button,
    Card,
    Icon,
    Input,
    Panel,
    PanelContent,
    PanelDivider,
    PanelHeader,
    Dialog,
    List,
    Alert,
    ListItem,
    TextArea,
    Toggle,
    LinkButton
} from "../../Elements";
import {AlertRuleExpressionForm, NetworkTag, DestinationInformation} from "../index";

import './CreateAlertRuleForm.scss';
import {SimpleLoader} from "..";

class SimpleAlertRuleAction extends Component {
    render() {
        const {icon, label, description, highlightColor, onClick, selected, disabled} = this.props;

        return (
            <Card color="light" className="SimpleAlertRuleAction" highlightColor={highlightColor} selectable selected={selected} onClick={onClick} disabled={disabled}>
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
            selectedMethod: null,
            alertTarget: null,
            alertType: null,
            alertParameters: null,
            alertDestinations: [],
            contractMethods: [],
            methodFilterQuery: '',
            expressions: [],
        }
    }

    componentDidMount() {
        const {projectId, contractActions, contractsLoaded, destinationsLoaded, notificationActions} = this.props;

        if (!contractsLoaded) {
            contractActions.fetchContractsForProject(projectId);
        }

        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
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
            case 'method_call':
                return 'Alert whenever a function is called inside a transaction';
            default:
                return 'Select an alert trigger type.';
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
                return 'Select contracts for which the alert will be triggered.'
        }
    };

    getAlertParametersDescription = () => {
        const {parametersSet, alertType, expressions, selectedMethod, selectedContract} = this.state;

        if (parametersSet) {
            switch (alertType) {
                case 'whitelisted_callers':
                case 'blacklisted_callers':
                    const expression = expressions.find(e => [AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES, AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES].includes(e.type));

                    const addressesCount = expression.parameters[AlertRuleExpressionParameterTypes.ADDRESSES].length;

                    return `${alertType === 'whitelisted_callers' ? 'Whitelisted' : 'Blacklisted'} ${addressesCount} contract addresses`;
                case 'method_call':
                    return `Function ${selectedMethod.name}() is called in ${selectedContract.name}`;
                default:
                    return 'Alert parameters set';
            }
        }

        return 'Set alert trigger parameters.'
    };

    selectAlertType = (type) => {
        const {alertTarget, selectedContract} = this.state;

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
            case 'method_call':
                expressionData.type = AlertRuleExpressionTypes.METHOD_CALL;
                parametersNeeded = true;
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

        Analytics.trackEvent('simple_alert_form_select_alert_type', {
            type: expressionData.type,
        });

        if (alertTarget || type === 'method_call') {
            nextStep = parametersNeeded ? 3 : 4;
        }

        const expression = new AlertRuleExpression(expressionData);

        this.setState({
            parametersNeeded,
            parametersSet: false,
            addressesValue: '',
            alertType: type,
            selectedContract: type !== 'method_call' ? selectedContract : null,
            selectedMethod: null,
            alertTarget: type !== 'method_call' ? alertTarget : null,
            expressions: [
                ...this.state.expressions.filter(e => type !== 'method_call' && [AlertRuleExpressionTypes.NETWORK, AlertRuleExpressionTypes.CONTRACT_ADDRESS].includes(e.type)),
                expression,
            ],
        }, () => this.goToStep(nextStep));
    };

    /**
     * @param {Contract} contract
     */
    fetchMethodsForContract = async (contract) => {
        const {contractActions, projectId} = this.props;

        this.setState({
            fetchingMethods: true,
        });

        const response = await contractActions.fetchMethodsForContract(projectId, contract.address, contract.network);

        if (response.success) {
            this.setState({
                contractMethods: response.data,
                fetchingMethods: false,
            });
        } else {
            this.setState({
                fetchingMethods: false,
            });
        }
    };

    /**
     * @param {'contract'|'project'} target
     * @param {Contract} [contract]
     */
    selectAlertTarget = (target, contract) => {
        const {parametersNeeded, expressions, alertType, parametersSet} = this.state;

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

            if (alertType === 'method_call') {
                this.fetchMethodsForContract(contract);
            }

            this.closeContractModal();
        }

        Analytics.trackEvent('simple_alert_form_select_alert_target', {
            type: target,
        });

        this.setState({
            alertTarget: target,
            selectedContract,
            parametersSet: alertType === 'method_call' ? false : parametersSet,
            selectedMethod: null,
            contractMethods: [],
            expressions: [
                ...expressions.filter(e => ![AlertRuleExpressionTypes.NETWORK, AlertRuleExpressionTypes.CONTRACT_ADDRESS].includes(e.type)),
                ...newExpressions,
            ],
        }, () => this.goToStep(parametersNeeded ? 3 : 4));
    };

    /**
     * @param {ContractMethod} method
     */
    selectAlertMethod = (method) => {
        this.setState({
            selectedMethod: method,
        }, this.applyParameters);

        this.closeMethodModal();
    };

    openContractModal = () => {
        this.setState({
            contractModelOpen: true,
        });
    };

    closeContractModal = () => {
        this.setState({
            contractModelOpen: false,
        });
    };

    handleMethodFilter = (event) => {
        const value = event.target.value;

        this.setState({
            methodFilterQuery: value,
        });
    };

    openMethodModal = () => {
        this.setState({
            methodModalOpen: true,
            methodFilterQuery: '',
        });
    };

    closeMethodModal = () => {
        this.setState({
            methodModalOpen: false,
        });
    };

    /**
     *
     * @return {boolean}
     */
    canApplyParameters() {
        const {alertType, addressesValue, selectedMethod, selectedContract} = this.state;

        const invalidAddresses = addressesValue.split(/\n/g).filter(a => !!a && !isValidAddress(a));

        switch (alertType) {
            case 'whitelisted_callers':
            case 'blacklisted_callers':
                return !!addressesValue && invalidAddresses.length === 0;
            case 'method_call':
                return !!selectedMethod && !!selectedContract;
            default:
                return false;
        }
    }

    applyParameters = () => {
        const {alertType, addressesValue, expressions, selectedMethod} = this.state;

        switch (alertType) {
            case 'whitelisted_callers':
            case 'blacklisted_callers':
                const validAddresses = addressesValue.split(/\n/g).filter(a => isValidAddress(a));

                if (!validAddresses.length) {
                    return;
                }

                const expression = expressions.find(e => [AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES, AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES].includes(e.type));
                const expressionIndex = expressions.indexOf(expression);

                const updatedExpression = expression.update({
                    parameters: {
                        [AlertRuleExpressionParameterTypes.ADDRESSES]: validAddresses,
                    },
                });

                const newExpressions = [...expressions];

                newExpressions.splice(expressionIndex, 1, updatedExpression);

                this.setState({
                    expressions: newExpressions,
                    parametersSet: true,
                }, () => this.goToStep(4));

                break;
            case 'method_call':
                const methodCallExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.METHOD_CALL);
                const methodCallExpressionIndex = expressions.indexOf(methodCallExpression);

                const updatedMethodCallExpression = methodCallExpression.update({
                    parameters: {
                        [AlertRuleExpressionParameterTypes.LINE_NUMBER]: selectedMethod.lineNumber,
                        [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'any',
                    },
                });

                const updatedExpressions = [...expressions];

                updatedExpressions.splice(methodCallExpressionIndex, 1, updatedMethodCallExpression);

                this.setState({
                    expressions: updatedExpressions,
                    parametersSet: true,
                }, () => this.goToStep(4));

                break;
            default:
                break;
        }
    };

    updateParameter = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    /**
     * @param {NotificationDestination} destination
     */
    toggleAlertDestination = (destination) => {
        const {alertDestinations} = this.state;

        let destinations;

        if (alertDestinations.includes(destination.id)) {
            destinations = alertDestinations.filter(dest => dest !== destination.id);
        } else {
            destinations = [
                ...alertDestinations,
                destination.id
            ];

            Analytics.trackEvent('simple_alert_form_select_alert_destination', {
                type: destination.type,
            });
        }

        this.setState({
            alertDestinations: destinations,
        });
    };

    /**
     * @return {string}
     */
    createSimpleAlertRuleName = () => {
        const {projectId} = this.props;
        const {alertType, alertTarget, selectedContract, selectedMethod} = this.state;

        let message = '';

        switch (alertType) {
            case 'success_tx':
                message = 'Successful transaction in ';
                break;
            case 'failed_tx':
                message = 'Failed transaction in ';
                break;
            case 'whitelisted_callers':
                message = 'Transaction from non-whitelisted address in ';
                break;
            case 'blacklisted_callers':
                message = 'Transaction from blacklisted address in ';
                break;
            case 'method_call':
                message = `Function ${selectedMethod.name} called in `;
                break;
            default:
                break;
        }

        if (alertTarget === 'project') {
            message += projectId;
        } else if (alertTarget === 'contract') {
            message += selectedContract.name;
        }

        return message;
    };

    /**
     * @return {boolean}
     */
    canCreateRule = () => {
        const {alertType, alertTarget, alertDestinations, parametersNeeded, parametersSet} = this.state;

        const hasAllInfoSet = !!alertTarget && !!alertType && alertDestinations.length > 0;

        if (parametersNeeded) {
            return hasAllInfoSet && parametersSet;
        }

        return hasAllInfoSet;
    };

    createAlertRule = async () => {
        const {projectId, actions} = this.props;
        const {expressions, alertDestinations} = this.state;

        this.setState({
            creatingAlertRule: true,
        });

        await actions.createAlertRuleForProject(projectId, this.createSimpleAlertRuleName(), '', expressions, alertDestinations);

        this.setState({
            creatingAlertRule: false,
            createdAlertRule: true,
        });
    };

    render() {
        const {projectId, contracts, destinations} = this.props;
        const {
            createdAlertRule, selectedMethod, creatingAlertRule, currentMode, contractMethods, selectedContract, expressions, parametersNeeded, parametersSet, currentStep, alertType, alertTarget, contractModelOpen, alertDestinations, addressesValue, methodModalOpen, methodFilterQuery, fetchingMethods
        } = this.state;

        const currentActiveExpressionTypes = expressions.filter(e => !!e).map(e => e.type);

        const invalidAddresses = addressesValue.split(/\n/g).filter(a => !!a && !isValidAddress(a));

        if (createdAlertRule) {
            return <Redirect to={`/project/${projectId}/alerts/rules`}/>
        }

        const filteredMethods = _.sortBy(contractMethods, 'lineNumber').filter(method => {
            if (!method.lineNumber || method.lineNumber === 0) {
                return false;
            }

            return method.name.includes(methodFilterQuery);
        });

        return (
            <Panel className="CreateAlertRule">
                <PanelHeader>
                    <h3>
                        <Link to={`/project/${projectId}/alerts/rules`}>Alerts</Link>
                        <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>
                        <span>Create Alert</span>
                    </h3>
                    <div className="MarginLeftAuto">
                        <LinkButton onClick={() => Intercom.openNewConversation('Suggestion/feedback for alerting:\n')}>Have suggestions or feedback?</LinkButton>
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
                        <SimpleAlertRuleStep label="Rule Type" description={this.getAlertTypeDescription()} finished={!!alertType} open={currentStep === 1} stepNumber="1" onClick={() => this.goToStep(1)}>
                            <div className="SimpleAlertRuleStepWrapper">
                                <SimpleAlertRuleAction onClick={() => this.selectAlertType('success_tx')} selected={alertType === 'success_tx'} icon="check-circle" label="Successful Transaction" description="Triggers whenever a successful transaction happens"/>
                                <SimpleAlertRuleAction onClick={() => this.selectAlertType('failed_tx')} selected={alertType === 'failed_tx'} icon="x-circle" label="Failed Transaction" description="Triggers whenever a failed transactions happens"/>
                                <SimpleAlertRuleAction onClick={() => this.selectAlertType('method_call')} selected={alertType === 'method_call'} icon="layers" label="Function Call" description="Triggers whenever a specific function is called in one of your contracts"/>
                                <SimpleAlertRuleAction onClick={() => this.selectAlertType('whitelisted_callers')} selected={alertType === 'whitelisted_callers'} icon="eye" label="Whitelisted Callers" description="Triggers whenever a contract that is not whitelisted calls one of your contracts"/>
                                <SimpleAlertRuleAction onClick={() => this.selectAlertType('blacklisted_callers')} selected={alertType === 'blacklisted_callers'} icon="eye-off" label="Blacklisted Callers" description="Triggers whenever a contract from this list calls one of your contracts"/>
                                <SimpleAlertRuleAction onClick={() => Intercom.openNewConversation('New alert suggestion:\n')} highlightColor="secondary" icon="zap" label="More Coming Soon" description="Have an idea? Click here and send us what you think can be the next alert type"/>
                            </div>
                        </SimpleAlertRuleStep>
                        {alertType !== 'method_call' && <SimpleAlertRuleStep label="Alert Target" description={this.getAlertTargetDescription()} stepNumber="2" open={currentStep === 2} finished={!!alertTarget} onClick={() => this.goToStep(2)}>
                            <div className="SimpleAlertRuleStepWrapper">
                                <SimpleAlertRuleAction onClick={this.openContractModal} selected={alertTarget === 'contract'} icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                                <SimpleAlertRuleAction onClick={() => this.selectAlertTarget('project')} selected={alertTarget === 'project'} icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                            </div>
                        </SimpleAlertRuleStep>}
                        {parametersNeeded && <SimpleAlertRuleStep label="Parameters" description={this.getAlertParametersDescription()} finished={parametersSet} stepNumber={alertType === 'method_call' ? 2 : 3} open={currentStep === 3} onClick={() => this.goToStep(3)}>
                            <div className="MarginBottom3">
                                {['whitelisted_callers', 'blacklisted_callers'].includes(alertType) && <TextArea value={addressesValue} className="AlertRuleSetup__AddressesList" field="addressesValue" onChange={this.updateParameter} placeholder="Enter the list of contract addresses separated by new lines"/>}
                                {invalidAddresses.length > 0 && <p>
                                    <span>Invalid addresses: </span>
                                    {invalidAddresses.map(a => <span className="DangerText" key={a}>{a}, </span>)}
                                </p>}
                                {alertType === 'method_call' && <div className="MethodCallPicker">
                                    {!selectedContract && <div onClick={this.openContractModal} className="MethodCallPicker__Option">
                                        <Icon icon="plus-circle" className="MethodCallPicker__Option__Icon"/>
                                        <span>Select contract</span>
                                    </div>}
                                    {!!selectedContract && <div onClick={this.openContractModal} className="MethodCallPicker__Selection">
                                        <div className="MethodCallPicker__Selection__Main">{selectedContract.name}</div>
                                        <div className="MethodCallPicker__Selection__Secondary">{selectedContract.address}</div>
                                    </div>}
                                    {!selectedMethod && <div onClick={this.openMethodModal} className={classNames(
                                        "MethodCallPicker__Option",
                                        {
                                            'MethodCallPicker__Option--Disabled': !selectedContract,
                                        },
                                    )}>
                                        <Icon icon="plus-circle" className="MethodCallPicker__Option__Icon"/>
                                        <span>Select function</span>
                                    </div>}
                                    {!!selectedMethod && <div onClick={this.openMethodModal} className="MethodCallPicker__Selection">
                                        <div className="MethodCallPicker__Selection__Main">{selectedMethod.name}()</div>
                                        <div className="MethodCallPicker__Selection__Secondary">Line {selectedMethod.lineNumber}</div>
                                    </div>}
                                </div>}
                                {alertType !== 'method_call' && <Button disabled={!this.canApplyParameters()} onClick={this.applyParameters}>
                                    <span>Apply</span>
                                </Button>}
                            </div>
                        </SimpleAlertRuleStep>}
                        <SimpleAlertRuleStep label="Destinations" description="Select the destinations to which the alert notifications will be sent to." finished={!!alertDestinations.length} stepNumber={parametersNeeded && alertType !== 'method_call' ? 4: 3} open={currentStep === 4} onClick={() => this.goToStep(4)}>
                            {destinations.map(destination => <Card color="light" className="DisplayFlex AlignItemsCenter" clickable onClick={() => this.toggleAlertDestination(destination)} key={destination.id}>
                                <Toggle value={alertDestinations.includes(destination.id)}/>
                                <div className="MarginLeft2">
                                    <div className="SemiBoldText">{destination.label}</div>
                                    <div className="MutedText">
                                        <DestinationInformation destination={destination}/>
                                    </div>
                                </div>
                            </Card>)}
                            <Alert color="info">
                                Integrations are managed on an account level. If you wish to add another destination like a Slack channel, go to the Destinations tabs on the right.
                            </Alert>
                        </SimpleAlertRuleStep>
                        <Dialog open={contractModelOpen} onClose={this.closeContractModal}>
                            <List className="ContractPickerList">
                                {contracts.map(contract => <ListItem key={contract.getUniqueId()} onClick={() => this.selectAlertTarget('contract', contract)} className="ContractPickerList__Item" selectable>
                                    <Blockies
                                        seed={contract.getUniqueId()}
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
                        <Dialog open={methodModalOpen} onClose={this.closeMethodModal} className="SelectContractMethodModal">
                            <div className="SelectContractMethodModal__Header">
                                <div className="SelectContractMethodModal__Header__InputWrapper">
                                    <div className="SelectContractMethodModal__Header__Label">Filter by name</div>
                                    <input autoFocus value={methodFilterQuery} type="text" className="SelectContractMethodModal__Header__Input" onChange={this.handleMethodFilter}/>
                                </div>
                            </div>
                            <div className="SelectContractMethodModal__Body">
                                {fetchingMethods && <div className="Padding4 DisplayFlex AlignItemsCenter">
                                    <SimpleLoader/>
                                </div>}
                                {!fetchingMethods && !filteredMethods.length && <div className="Padding4">
                                    <p className="TextAlignCenter Padding4 MutedText">No functions have been parsed for the <span className="SemiBoldText">{selectedContract && selectedContract.name}</span> contract.</p>
                                </div>}
                                {!fetchingMethods && !!filteredMethods.length && <List>
                                    {_.sortBy(contractMethods, 'lineNumber').filter(method => {
                                        if (!method.lineNumber || method.lineNumber === 0) {
                                            return false;
                                        }

                                        return method.name.includes(methodFilterQuery);
                                    }).map(method => <ListItem key={method.id} selectable onClick={() => this.selectAlertMethod(method)}>
                                        <div className="MarginBottom0">
                                            <span className="SemiBoldText">{method.name}</span>
                                            <span className="MutedText"> at line </span>
                                            <span className="SemiBoldText">{method.lineNumber}</span>
                                        </div>
                                        <div className="MutedText">{method.getDeclarationPreview()}</div>
                                    </ListItem>)}
                                </List>}
                            </div>
                        </Dialog>
                    </div>}
                    <div className="MarginTop4">
                        <Button disabled={!this.canCreateRule() || creatingAlertRule} onClick={this.createAlertRule}>
                            {!creatingAlertRule && <span>Create Alert</span>}
                            {creatingAlertRule && <span>Creating Alert</span>}
                        </Button>
                        <Button disabled={creatingAlertRule} outline to={`/project/${projectId}/alerts/rules`}>
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
        destinations: getNotificationDestinations(state),
        destinationsLoaded: areNotificationDestinationsLoaded(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAlertRuleForm);
