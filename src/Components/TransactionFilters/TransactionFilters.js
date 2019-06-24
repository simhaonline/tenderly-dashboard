import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TransactionFilterTypes} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {SegmentedControls, Button, Icon} from "../../Elements";

import './TransactionFilters.scss';

const transactionStatusOptions = [
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
     * @param {(string[])} value
     */
    handleStatusChange = (value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate('status', value);

        onFiltersChange({
            type: TransactionFilterTypes.STATUS,
            value,
        });
    };

    render() {
        const {contracts} = this.props;
        const {formData: {contracts: filterContracts, status}} = this.state;

        const contractSelectOptions = contracts.map(contract => ({
            value: contract.getApiId(),
            label: contract.name,
        }));

        return (
            <div className="TransactionFilters">
                <div className="FilterGroup">
                    <SegmentedControls options={transactionStatusOptions} value={status} onChange={this.handleStatusChange}/>
                </div>
                <div className="FilterGroup">
                    <Button size="small">
                        <Icon icon="filter"/>
                        <span>Filter Transactions</span>
                    </Button>
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
