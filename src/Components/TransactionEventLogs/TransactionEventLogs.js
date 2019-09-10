import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactJson from "react-json-view";

import {Contract, EventLog} from "../../Core/models";

import {Card, Code} from "../../Elements";

import './TransactionEventLogs.scss';

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
        };
    }


    render() {
        const {eventLog} = this.props;
        const {inputData, contract} = this.state;

        return (
            <Card color="light" className="TransactionEventLog">
                <div>
                    {!!eventLog.name && <span>{eventLog.name}</span>}
                    {!eventLog.name && <span>Event emitted in <span className="LinkText MonospaceFont">{eventLog.contract}</span></span>}
                </div>
                {!!contract && <div>
                    <span className="SemiBoldText MarginRight1">{contract.name}</span>
                    <span className="LinkText MonospaceFont">{contract.address}</span>
                </div>}
                {eventLog.inputs && eventLog.inputs.length > 0 && <Fragment>
                    <h4>Inputs</h4>
                    <div className="TransactionEventLog__RawDataWrapper">
                        <ReactJson src={inputData} theme="flat" enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={false}/>
                    </div>
                </Fragment>}
                {!!eventLog.data && <Fragment>
                    <h4>Data</h4>
                    <Code copy={eventLog.data}>{eventLog.data}</Code>
                </Fragment>}
            </Card>
        )
    }
}

class TransactionEventLogs extends PureComponent {
    render() {
        const {contracts, eventLogs} = this.props;

        return (
            <div>
                {eventLogs && eventLogs.length > 0 && <div>
                    {eventLogs.map((eventLog, index) => <TransactionEventLog eventLog={eventLog} contracts={contracts} key={index + eventLog.topics[0]}/>)}
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
