import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactJson from "react-json-view";
import Blockies from "react-blockies";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Contract, EventLog} from "../../Core/models";

import {Card, LinkButton, Icon, Select} from "../../Elements";
import {CopyableText, EmptyState} from '..';

import './TransactionEventLogs.scss';

class TransactionEventLog extends PureComponent {
    constructor(props) {
        super(props);

        const {contracts, eventLog} = props;

        const inputData = {};
        const rawData = {
            data: eventLog.data,
        };

        if (eventLog.inputs) {
            eventLog.inputs.forEach(input => {
                inputData[input.name] = input.value;
            });
        }

        if (eventLog.topics) {
            rawData.topics = eventLog.topics;
        }

        const contract = contracts.find(contract => contract.address === eventLog.contract);

        this.state = {
            inputData,
            network: contracts[0].network,
            rawData,
            contract,
            showData: false,
        };
    }

    toggleShowData = () => {
        const {showData} = this.state;

        this.setState({
            showData: !showData,
        });
    };

    render() {
        const {eventLog} = this.props;
        const {inputData, contract, showData, rawData, network} = this.state;

        return (
            <Card className="TransactionEventLog">
                <div className="DisplayFlex AlignItemsCenter JustifyContentSpaceBetween">
                    <div>
                        {!!eventLog.name && <h3>{eventLog.name}</h3>}
                        {!eventLog.name && <h3>Event emitted in <span className="LinkText MonospaceFont">{eventLog.contract}</span></h3>}
                    </div>
                    {!!contract && <div className="DisplayFlex AlignItemsCenter">
                        <Blockies
                            seed={contract.getUniqueId()}
                            size={8}
                            scale={4.5}
                            className="ContractPickerList__Item__Blockie"
                        />
                        <div>
                            <div className="SemiBoldText MarginBottom1">{contract.name}</div>
                            <CopyableText position='right' text={contract.address}
                                          render={(props)=> <div {...props} className={`LinkText MonospaceFont ${props.className}`}>{generateShortAddress(contract.address, 12, 6)}</div>}/>
                        </div>
                    </div>}
                    {!contract && <div className="DisplayFlex AlignItemsCenter">
                        <Blockies
                            seed={Contract.generateUniqueId(eventLog.contract,network)}
                            size={8}
                            scale={4.5}
                            className="ContractPickerList__Item__Blockie"
                        />
                        <div>
                            <div className="SemiBoldText MarginBottom1">Unknown</div>
                            <CopyableText position='right' text={eventLog.contract}
                                          render={(props)=> <div {...props} className={`LinkText MonospaceFont ${props.className}`}>{generateShortAddress(eventLog.contract, 12, 6)}</div>}/>
                        </div>
                    </div>}
                </div>
                {eventLog.inputs && eventLog.inputs.length > 0 && <Fragment>
                    <div className="TransactionEventLog__RawDataWrapper MarginTop2">
                        <ReactJson src={inputData} theme="flat" enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={false}/>
                    </div>
                </Fragment>}
                {!!eventLog.data && <Fragment>
                    <div className="MarginTop1">
                        <LinkButton onClick={this.toggleShowData}>
                            <Icon icon={showData ? 'chevron-up' : "chevron-down"}/>
                            <span> {showData ? "Hide" : "Show"} raw data and topics</span>
                        </LinkButton>
                    </div>
                    {showData && <div className="TransactionEventLog__RawDataWrapper MarginTop1">
                        <ReactJson src={rawData} theme="flat" enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={false}/>
                    </div>}
                </Fragment>}
            </Card>
        )
    }
}

class TransactionEventLogs extends PureComponent {
    constructor(props) {
        super(props);

        const {contracts, eventLogs} = this.props;

        const contractOptions = {};
        const eventNameOptions = {};

        eventLogs.forEach(eventLog => {
            const eventLogName = eventLog.name || "Unknown";

            if (!eventNameOptions[eventLogName]) {
                eventNameOptions[eventLogName] = {
                    value: eventLog.name,
                    label: eventLogName,
                };
            }

            if (!contractOptions[eventLog.contract]) {
                const knownContract = contracts.find(contract => contract.address === eventLog.contract);

                contractOptions[eventLog.contract] = {
                    value: eventLog.contract,
                    label: knownContract ? knownContract.name : generateShortAddress(eventLog.contract, 16, 8),
                };
            }
        });

        this.state = {
            contractOptions: Object.values(contractOptions),
            eventNameOptions: Object.values(eventNameOptions),
            nameFilters: null,
            contractFilters: null,
            filteredEvents: eventLogs,
        }
    }



    handleEventNameFilterChange = (value) => {
        this.setState({
            nameFilters: value,
        }, this.filterEventLogs);
    };

    handleContractFilterChange = (value) => {
        this.setState({
            contractFilters: value,
        }, this.filterEventLogs);
    };

    filterEventLogs = () => {
        const {eventLogs} = this.props;
        const {nameFilters, contractFilters} = this.state;

        let filteredEvents = eventLogs;

        if (nameFilters) {
            filteredEvents = filteredEvents.filter(eventLog => eventLog.name === nameFilters.value);
        }

        if (contractFilters) {
            filteredEvents = filteredEvents.filter(eventLog => eventLog.contract === contractFilters.value);
        }

        this.setState({
            filteredEvents,
        });
    };

    render() {
        const {contracts, eventLogs} = this.props;
        const {contractOptions, eventNameOptions, nameFilters, contractFilters, filteredEvents} = this.state;

        return (
            <div>
                {(!eventLogs || eventLogs.length === 0) && <div>
                    <EmptyState title="No Events / Logs" description="It seems that no events / logs were emitted in this transaction." icon="bookmark"/>
                </div>}
                {eventLogs && eventLogs.length > 0 && <div>
                    <div className="MarginBottom4 DisplayFlex">
                        <div className="TransactionEventLogs__FilterWrapper">
                            <h4 className="MarginBottom1">Event / Log Name</h4>
                            <Select value={nameFilters} selectLabel="Filter by event name" options={eventNameOptions} isClearable onChange={this.handleEventNameFilterChange}/>
                        </div>
                        <div className="TransactionEventLogs__FilterWrapper">
                            <h4 className="MarginBottom1">Contract</h4>
                            <Select value={contractFilters} selectLabel="Filter by contract" options={contractOptions} isClearable onChange={this.handleContractFilterChange}/>
                        </div>
                    </div>
                    {filteredEvents.map((eventLog, index) => <TransactionEventLog eventLog={eventLog} contracts={contracts} key={index + eventLog.topics[0]}/>)}
                </div>}
            </div>
        );
    }
}

TransactionEventLogs.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    eventLogs: PropTypes.arrayOf(PropTypes.instanceOf(EventLog),),
};

export default TransactionEventLogs;
