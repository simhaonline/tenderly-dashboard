import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes, TransactionFilterTypes} from "../../Common/constants";

import {SegmentedControls, Button, Icon, Dialog, DialogHeader, DialogBody, LinkButton} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

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

        this.state = {
            openModal: false,
            draftStatus: 'all',
            draftType: 'all',
            draftContracts: [],
            draftNetworks: [],
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

    resetFilters = () => {
        const {onFiltersChange} = this.props;

        onFiltersChange();

        this.handleModalClose();
    };

    handleApplyFilters = () => {
        const {draftStatus, draftType} = this.state;
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

        onFiltersChange(filters);

        this.handleModalClose();
    };

    render() {
        const {openModal, draftStatus, draftType} = this.state;
        const {activeFilters} = this.props;

        const status = activeFilters[TransactionFilterTypes.STATUS] ? activeFilters[TransactionFilterTypes.STATUS].value : 'all';

        return (
            <div className="TransactionFilters">
                <div className="FilterGroup">
                    <SegmentedControls options={transactionStatusOptions} value={status} onChange={this.handleStatusChange}/>
                </div>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <div className="FilterGroup">
                        <Button size="small" onClick={this.handleModalOpen}>
                            <Icon icon="filter"/>
                            <span>Filter Transactions</span>
                        </Button>
                        <Dialog open={openModal} onClose={this.handleModalClose}>
                            <DialogHeader>
                                <h3>Filter Transactions</h3>
                                <div className="MarginLeftAuto">
                                    <LinkButton onClick={this.resetFilters}>Reset Filters</LinkButton>
                                </div>
                            </DialogHeader>
                            <DialogBody>
                                <div className="MarginBottom4">
                                    <div className="MarginBottom3 DisplayFlex AlignItemsCenter JustifyContentSpaceBetween">
                                        <div>Status</div>
                                        <div>
                                            <SegmentedControls size="small" options={transactionStatusOptions} value={draftStatus} onChange={this.handleDraftStatusChange}/>
                                        </div>
                                    </div>
                                    <div className="MarginBottom3 DisplayFlex AlignItemsCenter JustifyContentSpaceBetween">
                                        <div>Type</div>
                                        <div>
                                            <SegmentedControls size="small" options={transactionTypeOptions} value={draftType} onChange={this.handleDraftTypeChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button outline onClick={this.handleModalClose}>
                                        <span>Close</span>
                                    </Button>
                                    <Button onClick={this.handleApplyFilters}>
                                        <span>Filter</span>
                                    </Button>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </div>
                </FeatureFlag>
            </div>
        );
    }
}

TransactionFilters.propTypes = {
    activeFilters: PropTypes.object,
    onFiltersChange: PropTypes.func.isRequired,
};

export default TransactionFilters;
