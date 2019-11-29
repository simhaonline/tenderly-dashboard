import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Contract} from "../../Core/models";
import {contractActions} from "../../Core/actions";

import {Input, Select, Button, Checkbox, LinkButton, Card} from "../../Elements";
import {ContractMethodOrLogSelectOption, ContractSelectOption} from "../index";

import './ContractSimulator.scss';

const DEFAULT_FROM_ADDRESS = '0x0000000000000000000000000000000000000000';
const DEFAULT_GAS = '1000000';

class ContractSimulator extends Component {
    state = {
        selectedContract: null,
        loadingContract: false,
        contract: null,
        block: '',
        blockSelected: false,
        maximumBlock: null,
        usePendingBlock: false,
        from: DEFAULT_FROM_ADDRESS,
        customFrom: false,
        gas: DEFAULT_GAS,
        customGas: false,
        contractFunction: null,
        functionInputs: {},
    };

    /**
     * @param {Contract} contract
     */
    handleContractSelect = async (contract) => {
        const {contractActions, project} = this.props;

        this.setState({
            selectedContract: contract,
            loadingContract: true,
        });

        const contractResponse = await contractActions.fetchContractForProject(project, contract.address, contract.network);

        let functionOptions = [];

        if (contractResponse.success && contractResponse.data.abi) {
            functionOptions = contractResponse.data.abi.filter(t => t.type === 'function').reduce((data, type) => {
                if (type.constant) {
                    data[0].options.push(type);
                } else {
                    data[1].options.push(type);
                }
                return data;
            }, [{label: "Read", options: [],}, {label: "Write", options: [],},]);
        }

        const maxBlockResponse = await contractActions.fetchLatestBlockForNetwork(contract.network);

        let maximumBlock = null;

        if (maxBlockResponse.success) {
            maximumBlock = maxBlockResponse.data;
        }

        this.setState({
            loadingContract: false,
            contract: contractResponse.success ? contractResponse.data : null,
            maximumBlock,
            functionOptions,
        });
    };

    handleFunctionSelect = (contractFunction) => {
        this.setState({
            contractFunction,
            functionInputs: {},
        });
    };

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    handleFunctionInputChange = (field, value) => {
        this.setState({
            functionInputs: {
                ...this.state.functionInputs,
                [field]: value,
            },
        });
    };

    toggleCustomTransactionParameter = (field) => {
        const currentState = this.state[field];

        switch(field) {
            case 'customFrom':
                this.setState({
                   customFrom: !currentState,
                   from: currentState ? DEFAULT_FROM_ADDRESS : '',
                });
                break;
            case 'customGas':
                this.setState({
                    customGas: !currentState,
                    gas: currentState ? DEFAULT_GAS : '',
                });
                break;
        }
    };

    handleFunctionInputBlur = () => {
        // validate the input value on blur
    };

    render() {
        const {contracts} = this.props;
        const {selectedContract, functionInputs, maximumBlock, contractFunction, usePendingBlock, functionOptions, block, from, gas, customFrom, customGas, loadingContract, contract, blockSelected} = this.state;

        return (
            <div>
                <div className="DisplayFlex MarginBottom4">
                    <Card className="Flex1">
                        <h3 className="MarginBottom2">Contract</h3>
                        <Select value={selectedContract} disabled={loadingContract} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.id} components={{
                            Option: ContractSelectOption,
                        }} selectLabel="Select contract" onChange={this.handleContractSelect} options={contracts}/>
                    </Card>
                    {!loadingContract && !!contract && <Card className="Flex1 MarginLeft2">
                        <h3 className="MarginBottom2">Simulation Point</h3>
                        <div>
                            <div className="MarginBottom2">Select the point in time in which you wish to simulate this transaction. Select the block number and at which index you wish to execute it or simulate it in the current pending block.</div>
                            <Checkbox field="usePendingBlock" label="Simulate in current pending block" value={usePendingBlock} onChange={this.handleInputChange}/>
                            <div className="DisplayFlex AlignItemsStart">
                                <Input value={block} readOnly={blockSelected || usePendingBlock} label="Block number" field="block" onChange={this.handleInputChange}/>
                                <Button disabled={usePendingBlock || !block} className="MarginLeft2">
                                    <span>Select Block</span>
                                </Button>
                            </div>
                            <div>
                                <span>Current Block: {maximumBlock}</span>
                            </div>
                        </div>
                    </Card>}
                </div>
                {!loadingContract && !!contract && <div>
                    <Card>
                        <h3 className="MarginBottom2">Transaction Parameters</h3>
                        <div className="DisplayFlex">
                            <div className="MarginRight4">
                                <div>From</div>
                                <Input value={from} label="From address" readOnly={!customFrom} field="from" onChange={this.handleInputChange}/>
                                <LinkButton onClick={() => this.toggleCustomTransactionParameter("customFrom")}>Use {customFrom ? 'default' : 'custom'} from address</LinkButton>
                            </div>
                            <div>
                                <div>Gas</div>
                                <Input value={gas} label="Gas" readOnly={!customGas} field="gas" onChange={this.handleInputChange}/>
                                <LinkButton onClick={() => this.toggleCustomTransactionParameter("customGas")}>Use {customGas ? 'default' : 'custom'} gas value</LinkButton>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="MarginBottom2">Function</h3>
                        <div className="DisplayFlex">
                            <div className="Flex1">
                                <Select options={functionOptions} value={contractFunction} getOptionLabel={contract => contract.name} components={{
                                    Option: ContractMethodOrLogSelectOption,
                                }} getOptionValue={contract => contract.name} onChange={this.handleFunctionSelect}/>
                            </div>
                            {!!contractFunction && <div className="Flex1 MarginLeft4">
                                <h4 className="MarginBottom2">Input Parameters</h4>
                                {contractFunction.inputs.map((functionInput, index) => {
                                    const field = `input_${index}`;

                                    return <div key={field} className="DisplayFlex AlignItemsCenter MarginBottom2">
                                        <div className="MonospaceFont LinkText MarginRight2">{functionInput.type}</div>
                                        <Input label={functionInput.name} value={functionInputs[field] || ''} onBlur={() => this.handleFunctionInputBlur(field, functionInput)} field={field} onChange={this.handleFunctionInputChange}/>
                                    </div>
                                })}
                            </div>}
                        </div>
                    </Card>
                    <div className="MarginTop4">
                        <Button>
                            <span>Simulate Transaction</span>
                        </Button>
                    </div>
                </div>}
            </div>
        );
    }
}

ContractSimulator.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        contractActions: bindActionCreators(contractActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(ContractSimulator);
