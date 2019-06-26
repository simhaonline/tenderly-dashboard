import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TransactionFilterTypes} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {SegmentedControls, Button, Icon, Dialog, DialogHeader, DialogBody} from "../../Elements";

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

        this.state = {
            openModal: false,
        };

        initializeForm(this, {
            searchQuery: '',
            contracts: [],
            status: 'all',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleModalOpen = () => {
        this.setState({
            openModal: true,
        });
    };

    handleModalClose = () => {
        this.setState({
            openModal: false,
        });
    };

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

    resetFilters = () => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate('status', 'all');

        onFiltersChange({
            type: TransactionFilterTypes.RESET,
        });

        this.handleModalClose();
    };

    render() {
        const {openModal, formData: {status}} = this.state;

        return (
            <div className="TransactionFilters">
                <div className="FilterGroup">
                    <SegmentedControls options={transactionStatusOptions} value={status} onChange={this.handleStatusChange}/>
                </div>
                <div className="FilterGroup">
                    <Button size="small" onClick={this.handleModalOpen}>
                        <Icon icon="filter"/>
                        <span>Filter Transactions</span>
                    </Button>
                    <Dialog open={openModal} onClose={this.handleModalClose}>
                        <DialogHeader>
                            <h3>Filter Transactions</h3>
                        </DialogHeader>
                        <DialogBody>
                            <div>
                                <Button outline onClick={this.resetFilters}>
                                    <span>Reset Filters</span>
                                </Button>
                                <Button>
                                    <span>Filter</span>
                                </Button>
                            </div>
                        </DialogBody>
                    </Dialog>
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
