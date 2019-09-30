import React, {PureComponent} from 'react';

import {SimpleAlertRuleTargetTypes, SimpleAlertRuleTypes} from "../../Common/constants";

import {simpleAlertTypeRequiresContract} from "../../Utils/AlertHelpers";

import {Form, Select, Input, ListItem, List, Button, Icon} from "../../Elements";
import {SimpleLoader} from "..";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import {isValidAddress} from "../../Utils/Ethereum";
import * as _ from "lodash";

class OptionBuilder extends PureComponent {
    render() {
        const {value, options, onChange} = this.props;

        return (
            <div>
                <Select value={value} options={options} onChange={onChange} getOptionLabel={option => option.name} getOptionValue={option => option.id}/>
            </div>
        );
    }
}

class OptionParameterBuilder extends PureComponent {
    render() {
        return (
            <div>
                funct param
            </div>
        );
    }
}

class AddressListParameters extends PureComponent {
    constructor(props) {
        super(props);

        const {value} = props;

        this.state = {
            editing: !value || value.addresses.length === 0,
            inputAddress: '',
            isInvalidAddress: false,
        };
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing,
            inputAddress: '',
            isInvalidAddress: false,
        })
    };

    /**
     * @param {string} address
     */
    toggleAddress = (address) => {
        const {value, onChange} = this.props;

        let addresses = [];

        if (value && value.addresses) {
            addresses = value.addresses;
        }

        if (addresses.includes(address)) {
            onChange({
                addresses: _.without(addresses, address),
            });
        } else {
            onChange({
                addresses: [
                    ...addresses,
                    address,
                ],
            });
        }
    };

    handleAddressChange = (field, value) => {
        this.setState({
            inputAddress: value,
        });
    };


    handleAddressSubmit = () => {
        const {inputAddress} = this.state;

        if (!isValidAddress(inputAddress)) {
            return;
        }

        this.toggleAddress(inputAddress);
        this.toggleEditing();
    };

    render() {
        const {value} = this.props;
        const {editing, inputAddress} = this.state;

        return (
            <div>
                <List>
                    {value.addresses.map(address => <ListItem key={address} className="DisplayFlex AlignItemsCenter">
                        <span className="MonospaceFont">{address}</span>
                        <div className="MarginLeftAuto">
                            <Button size="small" outline onClick={() => this.toggleAddress(address)}>
                                <Icon icon="x"/>
                            </Button>
                        </div>
                    </ListItem>)}
                    {!editing && <ListItem selectable onClick={this.toggleEditing}>
                        <div className="MutedText">
                            <Icon icon="plus-circle"/>
                            <span className="MarginLeft1">
                                Add more
                            </span>
                        </div>
                    </ListItem>}
                </List>
                {editing && <Form className="MarginTop2 AlertBuilderParameters_AddressInputWrapper" onSubmit={this.handleAddressSubmit}>
                    <Input value={inputAddress} onChange={this.handleAddressChange} field="inputAddress" autoFocus placeholder="Enter a valid address" className="AlertBuilderParameters_AddressInput"/>
                    <Button type="submit">Add</Button>
                    <Button outline onClick={this.toggleEditing}>
                        <Icon icon="x"/>
                    </Button>
                </Form>}
            </div>
        );
    }
}

class AlertRuleBuilderParameters extends PureComponent {
    isStepCompleted = () => {
        const {value} = this.props;

        return !!value;
    };

    getStepDescription = () => {
        const {value, alertTarget, alertType} = this.props;

        const type = value ? alertType : null;

        switch (type) {
            case SimpleAlertRuleTypes.LOG_EMITTED:
                return `Event / Log ${value.name} is emitted in ${alertTarget ? alertTarget.data.name : ''}`;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                return `Function ${value.name}() is called in ${alertTarget ? alertTarget.data.name : ''}`;
            case null:
                return 'Set alert trigger parameters.';
            default:
                return 'Alert parameters set.';
        }
    };

    render() {
        const {alertType, alertTarget, onToggle, number, isActiveStep, loading, value, options, onChange} = this.props;

        const requiresContract = simpleAlertTypeRequiresContract(alertType);

        const loaded = loading === false;

        const isContractTarget = !(!alertTarget || !alertTarget.data || alertTarget.type !== SimpleAlertRuleTargetTypes.CONTRACT);

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                {requiresContract && <div>
                    {!isContractTarget && <div>
                        Please select a contract first
                    </div>}
                    {isContractTarget && !loaded && <div className="Padding4 DisplayFlex AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {isContractTarget && loaded && <div className="MarginBottom4">
                        {[SimpleAlertRuleTypes.LOG_EMITTED, SimpleAlertRuleTypes.FUNCTION_CALLED].includes(alertType) &&
                            <OptionBuilder value={value} options={options} onChange={option => onChange(alertType, option)}/>
                        }
                    </div>}
                </div>}
                {!requiresContract && <div className="MarginBottom4">
                    {[SimpleAlertRuleTypes.WHITELISTED_CALLERS, SimpleAlertRuleTypes.BLACKLISTED_CALLERS].includes(alertType) &&
                        <AddressListParameters value={value} onChange={value => onChange(alertType, value)}/>
                    }
                </div>}
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderParameters.propTypes = {};

export default AlertRuleBuilderParameters;
