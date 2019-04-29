import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Input, Select} from "../../Elements";

import './TransactionFilters.scss';

class TransactionFilters extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            searchQuery: '',
            contracts: [],
            status: 'all',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    /**
     * @param {string} field
     * @param {string} value
     */
    handleSearchQueryChange = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        // onFiltersChange({
        //     type: EventFilterTypes.QUERY,
        //     value,
        // });
    };

    /**
     * @param {string} field
     * @param {(string[])} value
     */
    handleContractToggle = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        // onFiltersChange({
        //     type: EventFilterTypes.CONTRACTS,
        //     value,
        // });
    };

    render() {
        const {contracts} = this.props;
        const {formData: {searchQuery, contracts: filterContracts, status}} = this.state;

        const contractSelectOptions = contracts.map(contract => ({
            value: contract.id,
            label: contract.name,
        }));

        const statusSelectOptions = [
            {
                value: 'all',
                label: 'All',
            },
            {
                value: 'success',
                label: 'Success',
            },
            {
                value: 'failed',
                label: 'Failed',
            },
        ];

        return (
            <div className="TransactionFilters">
                <Input icon="search"
                       label="Search events by txHash, contract address or string"
                       field="searchQuery"
                       value={searchQuery} onChange={this.handleSearchQueryChange}/>
                <Select field="contracts" selectLabel="Select contracts" options={contractSelectOptions} multiple value={filterContracts} onChange={this.handleContractToggle}/>
                <Select field="status" selectLabel="Select Status" options={statusSelectOptions} value={status} onChange={this.handleContractToggle}/>
            </div>
        );
    }
}

TransactionFilters.propTypes = {
    lastSync: PropTypes.number,
    filters: PropTypes.array,
    onFiltersChange: PropTypes.func,
};

export default TransactionFilters;
