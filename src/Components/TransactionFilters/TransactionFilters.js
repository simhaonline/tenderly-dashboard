import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TransactionFilterTypes} from "../../Common/constants";

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

        onFiltersChange({
            type: TransactionFilterTypes.QUERY,
            value,
        });
    };

    /**
     * @param {string} field
     * @param {(string[])} value
     */
    handleContractToggle = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        onFiltersChange({
            type: TransactionFilterTypes.CONTRACTS,
            value,
        });
    };

    /**
     * @param {string} field
     * @param {(string[])} value
     */
    handleStatusSelect = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        onFiltersChange({
            type: TransactionFilterTypes.STATUS,
            value,
        });
    };

    render() {
        const {contracts} = this.props;
        const {formData: {searchQuery, contracts: filterContracts, status}} = this.state;

        const contractSelectOptions = contracts.map(contract => ({
            value: contract.getApiId(),
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
                <div className="FilterGroup">
                    <div className="FilterLabel">Filter by Status</div>
                    <Select field="status" selectLabel="Select Status" options={statusSelectOptions} value={status} onChange={this.handleStatusSelect}/>
                </div>
                <div className="FilterGroup">
                    <div className="FilterLabel">Filter by Contract</div>
                    <Select field="contracts" selectLabel="Select contracts" options={contractSelectOptions} multiple value={filterContracts} onChange={this.handleContractToggle}/>
                </div>
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
