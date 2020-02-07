import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {
    FeatureFlagTypes,
    TransactionFilterTypes,
    TransactionsListColumnTypes,
    UserPlanTypes
} from "../../Common/constants";
import {getUniqueNetworksForContracts} from "../../Common/Selectors/NetworkSelectors";

import {SegmentedControls, Button, Icon, Dialog, DialogHeader, DialogBody, Checkbox, LinkButton, Select} from "../../Elements";
import {
    ContractSelectMultiValueLabel,
    ContractSelectOption,
    FeatureFlag,
    NetworkSelectOption,
    PaidFeatureButton
} from "../index";

import './TransactionFilters.scss';
import AccountPlan from "../../Core/Billing/AccountPlan.model";

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

const TransactionColumnOption = ({activeColumns, icon = "layout", label, onChange, type}) => {
    return <div onClick={() => onChange(type)} className="TransactionsListSettings__ColumnOption">
        <Icon icon={icon} className="TransactionsListSettings__ColumnOption__Icon"/>
        <span className="TransactionsListSettings__ColumnOption__Label">{label}</span>
        <Checkbox value={activeColumns.includes(type)} field={type} onChange={() => {}}/>
    </div>;
};

class TransactionFilters extends Component {
    constructor(props) {
        super(props);

        const {contracts, tags} = props;

        const contractOptions = contracts || [];

        const networkOptions = getUniqueNetworksForContracts(contracts);

        const tagOptions = tags.map(tag => ({
            label: tag.tag,
            value: tag.tag,
            createdAt: tag.created_at,
        }));

        this.state = {
            contractOptions,
            networkOptions,
            tagOptions,
            openModal: false,
            settingsModalOpen: false,
            draftStatus: 'all',
            draftType: 'all',
            draftContracts: [],
            draftNetworks: '',
            draftTag: null,
            draftAfter: null,
            fromTagCreation: false,
            draftQuery: '',
        };
    }

    handleModalOpen = () => {
        const {activeFilters} = this.props;
        const {contractOptions, tagOptions, networkOptions} = this.state;

        const status = activeFilters[TransactionFilterTypes.STATUS] ? activeFilters[TransactionFilterTypes.STATUS].value: 'all';
        const type = activeFilters[TransactionFilterTypes.TYPE] ? activeFilters[TransactionFilterTypes.TYPE].value: 'all';
        const contracts = activeFilters[TransactionFilterTypes.CONTRACTS] ? contractOptions.filter(c => activeFilters[TransactionFilterTypes.CONTRACTS].value.includes(c.getUniqueId())): [];
        const networks = activeFilters[TransactionFilterTypes.NETWORKS] ? networkOptions.find(n => n.id === activeFilters[TransactionFilterTypes.NETWORKS].value): '';
        const tag = activeFilters[TransactionFilterTypes.TAG] ? tagOptions.find(t => t.value === activeFilters[TransactionFilterTypes.TAG].value) : '';

        this.setState({
            openModal: true,
            draftStatus: status,
            draftType: type,
            draftContracts: contracts,
            draftNetworks: networks,
            draftTag: tag,
        });
    };

    handleModalClose = () => {
        this.setState({
            openModal: false,
        });
    };

    handleSettingsModalOpen = () => {
        this.setState({
            settingsModalOpen: true,
        });
    };

    handleSettingsModalClose = () => {
        this.setState({
            settingsModalOpen: false,
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
            draftContracts: value || [],
        });
    };

    handleDraftNetworksChange = (value) => {
        this.setState({
            draftNetworks: value,
        });
    };

    handleDraftTagChange = (value) => {
        const {fromTagCreation, draftAfter} = this.state;

        this.setState({
            draftTag: value,
            draftAfter: fromTagCreation && !value ? null : draftAfter,
            fromTagCreation: !value ? false : fromTagCreation,
        });
    };

    handleFromTagCreation = (field, newValue) => {
        const {draftTag} = this.state;

        this.setState({
            fromTagCreation: newValue,
            draftAfter: newValue ? draftTag.createdAt : null,
        });
    };

    resetFilters = () => {
        const {onFiltersChange} = this.props;

        onFiltersChange();

        this.handleModalClose();
    };

    handleApplyFilters = () => {
        const {draftStatus, draftAfter, draftType, draftContracts, draftTag, draftNetworks} = this.state;
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
            value: draftContracts.map(c => c.getUniqueId()),
        });

        filters.push({
            type: TransactionFilterTypes.NETWORKS,
            value: draftNetworks ? draftNetworks.id : null,
        });

        filters.push({
            type: TransactionFilterTypes.TAG,
            value: draftTag ? draftTag.value : null,
        });

        filters.push({
            type: TransactionFilterTypes.AFTER,
            value: draftAfter ? draftAfter : null,
        });

        onFiltersChange(filters);

        this.handleModalClose();
    };

    handleColumnToggle = (column) => {
        const {onColumnToggle} = this.props;

        onColumnToggle(column);
    };

    render() {
        const {openModal, settingsModalOpen, draftStatus, fromTagCreation, draftType, draftContracts, draftNetworks, draftTag, contractOptions, tagOptions, networkOptions} = this.state;
        const {activeFilters, activeColumns, plan} = this.props;

        const status = activeFilters[TransactionFilterTypes.STATUS] ? activeFilters[TransactionFilterTypes.STATUS].value : 'all';

        return (
            <div className="TransactionFilters">
                {plan.plan.type !== UserPlanTypes.FREE && <div>
                    <SegmentedControls options={transactionStatusOptions} value={status} onChange={this.handleStatusChange}/>
                </div>}
                <div className="MarginLeftAuto">
                    <Button outline onClick={this.handleSettingsModalOpen}>
                        <Icon icon="settings"/>
                    </Button>
                    <PaidFeatureButton includes="transaction_search.filtering" plan={plan} size="small" onClick={this.handleModalOpen}>
                        <Icon icon="filter"/>
                        <span>Filter Transactions</span>
                    </PaidFeatureButton>
                    <Dialog open={settingsModalOpen} onClose={this.handleSettingsModalClose} className="TransactionsListSettings">
                        <DialogHeader>
                            <h3>Settings</h3>
                        </DialogHeader>
                        <DialogBody>
                            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                                <SegmentedControls options={[
                                    {
                                        value: 'comfortable',
                                        label: 'Comfortable',
                                    },
                                    {
                                        value: 'compact',
                                        label: 'Compact',
                                    },
                                ]} value={'comfortable'} onChange={this.handleDraftStatusChange}/>
                            </FeatureFlag>
                            <h3 className="MarginBottom1">Configure Columns</h3>
                            <p className="MutedText MarginBottom3">Change the layout of the transactions list and display only the columns and information that is most important to you.</p>
                            <div className="TransactionsListSettings__ColumnsList">
                                <TransactionColumnOption activeColumns={activeColumns} type={TransactionsListColumnTypes.TX_HASH} label="Transaction Hash" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="check-circle" activeColumns={activeColumns} type={TransactionsListColumnTypes.STATUS} label="Status" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="arrow-up-circle" activeColumns={activeColumns} type={TransactionsListColumnTypes.FROM} label="From" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="arrow-down-circle" activeColumns={activeColumns} type={TransactionsListColumnTypes.TO} label="To" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="file-text" activeColumns={activeColumns} type={TransactionsListColumnTypes.CONTRACTS} label="Contracts" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="tag" activeColumns={activeColumns} type={TransactionsListColumnTypes.TAGS} label="Tags" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="code" activeColumns={activeColumns} type={TransactionsListColumnTypes.METHOD} label="Function" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="layers" activeColumns={activeColumns} type={TransactionsListColumnTypes.NETWORK} label="Network" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="box" activeColumns={activeColumns} type={TransactionsListColumnTypes.BLOCK} label="Block No." onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="droplet" activeColumns={activeColumns} type={TransactionsListColumnTypes.GAS_USED} label="Gas Used" onChange={this.handleColumnToggle}/>
                                <TransactionColumnOption icon="calendar" activeColumns={activeColumns} type={TransactionsListColumnTypes.TIMESTAMP} label="Timestamp" onChange={this.handleColumnToggle}/>
                            </div>
                        </DialogBody>
                    </Dialog>
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
                                        <Select multiple value={draftContracts} components={{
                                            Option: ContractSelectOption,
                                            MultiValueLabel: ContractSelectMultiValueLabel,
                                        }} selectLabel="Select Contracts" options={contractOptions} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.getUniqueId()} onChange={this.handleDraftContractsChange}/>
                                    </div>
                                </div>
                                <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Network</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <Select components={{
                                            Option: NetworkSelectOption,
                                        }} isClearable value={draftNetworks} selectLabel="Select Network" options={networkOptions} getOptionLabel={network => network.name} getOptionValue={network => network.id} onChange={this.handleDraftNetworksChange}/>
                                    </div>
                                </div>
                                {tagOptions.length > 0 && <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label">Tag</div>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <Select isClearable value={draftTag} selectLabel="Select Tag" options={tagOptions} onChange={this.handleDraftTagChange}/>
                                    </div>
                                </div>}
                                {!!draftTag && <div className="TransactionFilters__Dialog__FilterRow">
                                    <div className="TransactionFilters__Dialog__FilterRow__Label"/>
                                    <div className="TransactionFilters__Dialog__FilterRow__Filter">
                                        <Checkbox value={fromTagCreation} field="fromTagCreation" onChange={this.handleFromTagCreation} label="Show only transactions after this tag was created"/>
                                    </div>
                                </div>}
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
    activeColumns: PropTypes.array.isRequired,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    tags: PropTypes.array.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    // @TODO @BILLING Remove when implement billing
    plan: PropTypes.instanceOf(AccountPlan).isRequired,
};

export default TransactionFilters;
