import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactJson from "react-json-view";
import Blockies from "react-blockies";

import {Contract, EventLog} from "../../Core/models";

import {Card, Code, LinkButton, Icon, Select} from "../../Elements";

import './TransactionEventLogs.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

class TransactionEventLog extends PureComponent {
    constructor(props) {
        super(props);

        const {contracts, eventLog} = props;

        const inputData = {};

        if (eventLog.inputs) {
            eventLog.inputs.forEach(input => {
                inputData[input.name] = input.value;
            });
        }

        const contract = contracts.find(contract => contract.address === eventLog.contract);

        this.state = {
            inputData,
            contract,
            showData: !eventLog.inputs,
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
        const {inputData, contract, showData} = this.state;

        return (
            <Card color="light" className="TransactionEventLog">
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
                            <div className="LinkText MonospaceFont">{generateShortAddress(contract.address, 12, 6)}</div>
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
                            <span> {showData ? "Hide" : "Show"} raw data</span>
                        </LinkButton>
                    </div>
                    {showData && <div className="MarginTop1">
                        <Code copy={eventLog.data}>{eventLog.data}</Code>
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

        console.log(nameFilters, contractFilters);

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
