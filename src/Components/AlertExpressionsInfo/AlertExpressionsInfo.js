import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";

import {generateShortAddress} from "../../Utils/AddressFormatter";
import {getLabelForNetwork} from "../../Utils/NetworkHelpers";

import {AlertRule, Contract, Project} from "../../Core/models";

import {
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes,
    SimpleAlertRuleTypeIconMap, SimpleAlertRuleTypeLabelMap, SimpleAlertRuleTypes
} from "../../Common/constants";

import {Card, Icon} from "../../Elements";
import {NetworkTag} from '../';

import './AlertExpressionsInfo.scss';

class ExpressionConditionPreview extends PureComponent {
    render() {
        const {rule} = this.props;

        const type = rule.simpleType;

        const showDetails = ![SimpleAlertRuleTypes.FAILED_TX, SimpleAlertRuleTypes.SUCCESSFUL_TX].includes(type);

        return (
            <Card color="dark" className="DisplayFlex AlignItemsCenter">
                <div className="ExpressionTargetPreview__IconWrapper">
                    <Icon icon={SimpleAlertRuleTypeIconMap[type]}/>
                </div>
                <div>
                    <div className="SemiBoldText">{SimpleAlertRuleTypeLabelMap[type]}</div>
                    {showDetails && <div className="MonospaceFont MarginTop1 LinkText">
                        {rule.getExpressionsDetails()}
                    </div>}
                </div>
            </Card>
        )
    }
}

class ExpressionTargetPreview extends PureComponent {

    render() {
        const {expressions, contracts, project} = this.props;

        const hasNetwork = expressions.find(expression => expression.type === AlertRuleExpressionTypes.NETWORK);
        const hasAddress = expressions.find(expression => expression.type === AlertRuleExpressionTypes.CONTRACT_ADDRESS);

        const isProjectWide = !hasAddress && !hasNetwork;

        return (
            <div>
                {isProjectWide
                    ? <Card className="DisplayFlex AlignItemsCenter" color="dark">
                        <div className="ExpressionTargetPreview__IconWrapper">
                            <Icon icon="project"/>
                        </div>
                        <div>
                            <div className="SemiBoldText MarginBottom1">{project.name}</div>
                            <div className="MonospaceFont LinkText">{project.slug}</div>
                        </div>
                    </Card>
                    : <Card className="DisplayFlex AlignItemsCenter" color="dark">
                        <div className="ExpressionTargetPreview__IconWrapper">
                            {!hasAddress && <Icon icon="layers"/>}
                            {!!hasAddress && <Blockies size={8} scale={5} className="ExpressionTargetPreview__Blockie"
                                                       seed={Contract.generateUniqueId(
                                                           hasAddress.parameters[AlertRuleExpressionParameterTypes.ADDRESS],
                                                           hasNetwork.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID]
                                                       )}/>}
                        </div>
                        <div>
                            <div className="SemiBoldText MarginBottom1">
                                {!!hasAddress && <span>{contracts.find(contract => contract.getUniqueId() === Contract.generateUniqueId(
                                    hasAddress.parameters[AlertRuleExpressionParameterTypes.ADDRESS],
                                    hasNetwork.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID]
                                )).name}</span>}
                                {!hasAddress && <span>{getLabelForNetwork(hasNetwork.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID])}</span>}
                            </div>
                            <div>
                                <NetworkTag size="small" network={hasNetwork.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID]}/>
                                {!!hasAddress && <span className="MonospaceFont LinkText"> {generateShortAddress(hasAddress.parameters[AlertRuleExpressionParameterTypes.ADDRESS])}</span>}
                            </div>
                        </div>
                    </Card>
                }
            </div>
        )
    }
}

class AlertExpressionsInfo extends PureComponent {
    render() {
        const {rule, contracts, project} = this.props;

        return (
            <div>
                <h3 className="MarginBottom2">Alert Type</h3>
                <ExpressionConditionPreview rule={rule}/>
                <h3 className="MarginBottom2">Target</h3>
                <ExpressionTargetPreview expressions={rule.expressions} contracts={contracts} project={project}/>
            </div>
        );
    }
}

AlertExpressionsInfo.propTypes = {
    rule: PropTypes.instanceOf(AlertRule).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
};

export default AlertExpressionsInfo;
