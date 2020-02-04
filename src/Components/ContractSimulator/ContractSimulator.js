import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";

import {Contract} from "../../Core/models";
import {contractActions, transactionActions} from "../../Core/actions";

import {Input, Select, Button, Checkbox, LinkButton, Card, PanelContent} from "../../Elements";
import {ContractMethodOrLogSelectOption, ContractSelectOption} from "../index";

import './ContractSimulator.scss';
import {isValidAddress, isValidInputParameter} from "../../Utils/Ethereum";

const DEFAULT_FROM_ADDRESS = '0x0000000000000000000000000000000000000000';
const DEFAULT_GAS = '1000000';

class ContractSimulator extends Component {
    state = {
        selectedContract: null,
        loadingContract: false,
        contract: null,
        block: '',
        blockIndex: '0',
        blockSelected: false,
        maximumBlock: null,
        maximumBlockIndex: 0,
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
            block: maximumBlock,
            blockSelected: false,
            blockIndex: '0',
            functionOptions,
        });
    };

    handleBlockSelect = async () => {
        const {contractActions} = this.props;
        const {contract, block} = this.state;

        const txIndexesResponse =  await contractActions.fetchTransactionIndexesForBlock(contract.network, block);

        if (txIndexesResponse.success) {
            this.setState({
                blockSelected: true,
                maximumBlockIndex: txIndexesResponse.data,
            });
        }
    };

    handleFunctionSelect = (contractFunction) => {
        this.setState({
            contractFunction,
            functionInputs: {},
            functionInputErrors: {},
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
            default:
                break;
        }
    };

    handleFunctionInputBlur = (field, functionInput) => {
        const {functionInputs, functionInputErrors} = this.state;

        const isValid = isValidInputParameter(functionInput.type, functionInputs[field]);

        this.setState({
            functionInputErrors: {
                ...functionInputErrors,
                [field]: !isValid,
            },
        });
    };

    isBlockNumberValid = () => {
        const {usePendingBlock, block, blockSelected} = this.state;

        if (usePendingBlock || !block || blockSelected) {
            return false;
        }

        return !isNaN(block);
    };

    isFromValid = () => {
        return true;
    };

    submitTransactionForSimulation = () => {
        const {onSubmit, transactionActions} = this.props;
        const {selectedContract, block, blockIndex, from, gas, contractFunction, functionInputs} = this.state;

        const response = transactionActions.createSimulation({
            network: selectedContract.network,
            block,
            blockIndex,
            from,
            to: selectedContract.address,
            gas, gasPrice:0,
            value:0,
            method: contractFunction,
            parameters: _.sortBy(Object.keys(functionInputs), [key=> parseInt(key.replace("input_",""))]).map(key=> functionInputs[key])
        });

        onSubmit(response.data);
    };

    render() {
        const {contracts} = this.props;
        const {selectedContract, functionInputs, functionInputErrors, maximumBlockIndex, maximumBlock, contractFunction, usePendingBlock, functionOptions, block, blockIndex, from, gas, customFrom, customGas, loadingContract, contract, blockSelected} = this.state;

        return (
            <div className="ContractSimulator">
                <Panel>
                    <PanelContent>
                    <h3 className="MarginBottom2">Contract</h3>
                    <Select value={selectedContract} disabled={loadingContract} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.id} components={{
                        Option: ContractSelectOption,
                    }} selectLabel="Select contract" onChange={this.handleContractSelect} options={contracts}/>
                </Card>
                {!loadingContract && !!contract && <div>
                    <Card>
                        <h3 className="MarginBottom2">Simulation Point</h3>
                        <div>
                            <div className="MarginBottom2">Select the point in time in which you wish to simulate this transaction. Select the block number and at which index you wish to execute it or simulate it in the current pending block.</div>
                            <Checkbox field="usePendingBlock" label="Simulate in current pending block" value={usePendingBlock} onChange={this.handleInputChange}/>
                            <div className="DisplayFlex AlignItemsStart">
                                <Input value={block} readOnly={blockSelected || usePendingBlock} label="Block number" field="block" onChange={this.handleInputChange}/>
                                <Button disabled={!this.isBlockNumberValid()} className="MarginLeft2" onClick={this.handleBlockSelect}>
                                    <span>Select Block</span>
                                </Button>
                            </div>
                            <div>
                                <span>Current Block: {maximumBlock}</span>
                            </div>
                        </div>
                        {blockSelected && <div>
                            <Input value={blockIndex} readOnly={usePendingBlock} label="Block Index" field="blockIndex" onChange={this.handleInputChange}/>
                            <span>Maximum Block Index: {maximumBlockIndex}</span>
                        </div>}
                    </Panel>
                    <Panel>
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
                    </Panel>
                    <Panel>
                        <h3 className="MarginBottom2">Function</h3>
                        <div className="DisplayFlex">
                            <div className="Flex1">
                                <Select options={functionOptions} value={contractFunction} getOptionLabel={contract => contract.name} components={{
                                    Option: ContractMethodOrLogSelectOption,
                                }} getOptionValue={contract => contract.name} onChange={this.handleFunctionSelect}/>
                            </div>
                            {!!contractFunction && <div className="Flex1 MarginLeft4">
                                <h4 className="MarginBottom2">Input Parameters</h4>
                                {!!contractFunction.inputs && contractFunction.inputs.map((functionInput, index) => {
                                    const field = `input_${index}`;

                                    return <div key={field} className="DisplayFlex AlignItemsCenter MarginBottom2">
                                        <div className="MonospaceFont LinkText MarginRight2">{functionInput.type}</div>
                                        <Input label={functionInput.name} value={functionInputs[field] || ''} onBlur={() => this.handleFunctionInputBlur(field, functionInput)} field={field} onChange={this.handleFunctionInputChange}/>
                                        {!!functionInputErrors[field] && <div className="DangerText">Invalid input</div>}
                                    </div>
                                })}
                            </div>}
                        </div>
                    </Panel>
                    <div className="MarginTop4">
                        <Button disabled={!this.isFromValid()} onClick={this.submitTransactionForSimulation}>
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
        transactionActions: bindActionCreators(transactionActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(ContractSimulator);
