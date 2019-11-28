import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {Select} from "../../Elements";
import {ContractSelectOption} from "../index";

import './ContractSimulator.scss';

class ContractSimulator extends Component {
    state = {
        selectedContract: null,
    };

    /**
     * @param {Contract} contract
     */
    handleContractSelect = (contract) => {
            this.setState({
            selectedContract: contract,
        });
    };

    render() {
        const {contracts} = this.props;
        const {selectedContract} = this.state;

        return (
            <div>
                <Select value={selectedContract} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.id} components={{
                    Option: ContractSelectOption,
                }} selectLabel="Select contract" onChange={this.handleContractSelect} options={contracts}/>
            </div>
        );
    }
}

ContractSimulator.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
};

export default ContractSimulator;
