import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";

import {Contract} from "../../Core/models";

import {NetworkLabelMap, TransactionFilterTypes} from "../../Common/constants";

import {SegmentedControls, Button, Icon, Dialog, DialogHeader, DialogBody, LinkButton, Select} from "../../Elements";

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

const transactionTypeOptions = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'internal',
        label: 'Internal',
    },
    {
        value: 'direct',
        label: 'Direct',
    },
];

class TransactionFilters extends Component {
    constructor(props) {
        super(props);

        const contractOptions = props.contracts.map(contract => ({
            value: contract.getUniqueId(),
            label: contract.name,
        }));

        const networkOptions = _.uniqBy(props.contracts, 'network').map(contract => ({
            value: contract.network,
            label: NetworkLabelMap[contract.network],
        }));

        this.state = {
            contractOptions,
            networkOptions,
            openModal: false,
            draftStatus: 'all',
            draftType: 'all',
            draftContracts: [],
            draftNetworks: '',
            draftQuery: '',
        };
    }

    handleModalOpen = () => {
        const {activeFilters} = this.props;

        const status = activeFilters[TransactionFilterTypes.STATUS] ? activeFilters[TransactionFilterTypes.STATUS].value : 'all';
        const type = activeFilters[TransactionFilterTypes.TYPE] ? activeFilters[TransactionFilterTypes.TYPE].value : 'all';

        this.setState({
            openModal: true,
            draftStatus: status,
            draftType: type,
            draftContracts: [],
            draftNetworks: '',
        });
    };

    handleModalClose = () => {
        this.setState({
            openModal: false,
        });
    };

    handleDraftStatusChange = (value) => {
        this.setState({
            draftStatus: value,
        });
    };

    handleDraftTypeChange = (value) => {
        this.setState({
            draftType: value,
        });
    };

    /**
     * @param {(string[])} value
     */
    handleStatusChange = (value) => {
        const {onFiltersChange} = this.props;

        onFiltersChange([
            {
                type: TransactionFilterTypes.STATUS,
                value,
            },
        ]);
    };

    handleDraftContractsChange = (value) => {
        this.setState({
            draftContracts: value,
        });
    };

    handleDraftNetworksChange = (value) => {
        this.setState({
            draftNetworks: value,
        });
    };

    resetFilters = () => {
        const {onFiltersChange} = this.props;

        onFiltersChange();

        this.handleModalClose();
    };

    handleApplyFilters = () => {
        const {draftStatus, draftType, draftContracts, draftNetworks} = this.state;
        const {onFiltersChange} = this.props;

        const filters = [];

        filters.push({
            type: TransactionFilterTypes.STATUS,
            value: draftStatus,
        });

        filters.push({
            type: TransactionFilterTypes.TYPE,
            value: draftType,
        });

        filters.push({
            type: TransactionFilterTypes.CONTRACTS,
            value: draftContracts,
        });

        filters.push({
            type: TransactionFilterTypes.NETWORKS,
            value: draftNetworks,
        });

        onFiltersChange(filters);

        this.handleModalClose();
    };

    render() {
        const {openModal, draftStatus, draftType, draftContracts, draftNetworks, contractOptions, networkOptions} = this.state;
        const {activeFilters} = this.props;

        const status = activeFilters[TransactionFilterTypes.STATUS] ? activeFilters[TransactionFilterTypes.STATUS].value : 'all';

        return (
            <div className="TransactionFilters">
                <div>
                    <SegmentedControls options={transactionStatusOptions} value={status} onChange={this.handleStatusChange}/>
                </div>
                <div className="MarginLeftAuto">
                    <Button size="small" onClick={this.handleModalOpen}>
                        <Icon icon="filter"/>
                        <span>Filter Transactions</span>
                    </Button>
                    <Dialog open={openModal} onClose={this.handleModalClose}>
                        <DialogHeader>
                            <h3>Filter Transactions</h3>
                        </DialogHeader>
                        <DialogBody>
                            <div className="MarginBottom4">
                                <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Status</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <SegmentedControls options={transactionStatusOptions} value={draftStatus} onChange={this.handleDraftStatusChange}/>
                                    </div>
                                </div>
                                <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Type</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <SegmentedControls options={transactionTypeOptions} value={draftType} onChange={this.handleDraftTypeChange}/>
                                    </div>
                                </div>
                                <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Contracts</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <Select multiple value={draftContracts} options={contractOptions} onChange={this.handleDraftContractsChange}/>
                                    </div>
                                </div>
                                <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Network</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <Select value={draftNetworks} options={networkOptions} onChange={this.handleDraftNetworksChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="DisplayFlex AlignItemsCenter">
                                <div>
                                    <Button onClick={this.handleApplyFilters}>
                                        <span>Filter</span>
                                    </Button>
                                    <Button outline onClick={this.handleModalClose}>
                                        <span>Close</span>
                                    </Button>
                                </div>
                                <div className="MarginLeftAuto">
                                    <LinkButton onClick={this.resetFilters}>Reset Filters</LinkButton>
                                </div>
                            </div>
                        </DialogBody>
                    </Dialog>
                </div>
            </div>
        );
    }
}

TransactionFilters.propTypes = {
    activeFilters: PropTypes.object,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    onFiltersChange: PropTypes.func.isRequired,
};

export default TransactionFilters;
