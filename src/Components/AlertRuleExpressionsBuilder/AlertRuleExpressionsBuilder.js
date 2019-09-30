import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from "react-json-view";

import {AlertRuleExpression, Contract} from "../../Core/models";
import {
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes,
    SimpleAlertRuleTypes
} from "../../Common/constants";

import {Card} from "../../Elements";

import AlertRuleTypeSelect from "./AlertRuleTypeSelect";
import AlertRuleTargetSelect from "./AlertRuleTargetSelect";
import AlertRuleParameters from "./AlertRuleParameters";

import './AlertRuleExpressionsBuilder.scss';
import {simpleAlertTypeRequiresParameters} from "../../Utils/AlertHelpers";

class AlertRuleExpressionsBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alertType: null,
            alertTarget: null,
            expressions: [],
            loadingParameterOptions: false,
            parameterOptions: null,
        };
    }

    handleAlertTypeChange = (option) => {
        const expressions = [];

        if ([SimpleAlertRuleTypes.SUCCESSFUL_TX, SimpleAlertRuleTypes.FAILED_TX].includes(option.value)) {
            const expression = new AlertRuleExpression({
                type: AlertRuleExpressionTypes.TRANSACTION_STATUS,
                parameters: {
                    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: option.value === SimpleAlertRuleTypes.SUCCESSFUL_TX,
                },
            });

            expressions.push(expression);
        }

        this.setState({
            alertType: option,
            alertTarget: null,
            expressions,
        });
    };

    fetchContractMethods = async (address, network) => {
        console.log(address, network);

    };

    handleAlertTargetChange = (option) => {
        const {expressions, alertType} = this.state;
        const {type} = option;

        const newExpressions = expressions.filter(e => ![
            AlertRuleExpressionTypes.NETWORK,
            AlertRuleExpressionTypes.CONTRACT_ADDRESS,
        ].includes(e.type));

        if (type === 'contract') {
            const contractExpression = new AlertRuleExpression({
                type: AlertRuleExpressionTypes.CONTRACT_ADDRESS,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESS]: option.address,
                },
            });

            newExpressions.push(contractExpression);

            if ([SimpleAlertRuleTypes.FUNCTION_CALLED].includes(alertType.value)) {
                this.fetchContractMethods(option.address, option.network);
            }
        }

        if (type === 'network' || type === 'contract') {
            const networkExpression = new AlertRuleExpression({
                type: AlertRuleExpressionTypes.NETWORK,
                parameters: {
                    [AlertRuleExpressionParameterTypes.NETWORK_ID]: option.network,
                },
            });

            newExpressions.push(networkExpression);
        }

        this.setState({
            alertTarget: option,
            expressions: newExpressions,
        });
    };

    render() {
        const {alertType, alertTarget, expressions} = this.state;
        const {contracts} = this.props;

        const parametersRequired = !!alertType && simpleAlertTypeRequiresParameters(alertType.value);

        return (
            <div className="AlertRuleExpressionsBuilder">
                <Card color="dark" className="AlertRuleExpressionsBuilder__Rule">
                    <AlertRuleTypeSelect value={alertType} onChange={this.handleAlertTypeChange}/>
                    {!!alertType && <AlertRuleTargetSelect value={alertTarget} onChange={this.handleAlertTargetChange} alertType={alertType} contracts={contracts}/>}
                    {!!alertTarget && parametersRequired && <AlertRuleParameters/>}
                </Card>
                <ReactJson src={expressions} theme="flat" enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={false}/>
            </div>
        );
    }
}

AlertRuleExpressionsBuilder.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
};

AlertRuleExpressionsBuilder.defaultProps = {
    onChange: () => {},
};

export default AlertRuleExpressionsBuilder;
