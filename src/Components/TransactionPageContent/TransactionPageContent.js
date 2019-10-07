import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {EventLog, StateDiff, Transaction, Project} from "../../Core/models";

import {TransactionExecution, TransactionGeneralInformation, TransactionStackTrace} from "../index";

class TransactionPageContent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            action: null,
        };
    }

    handleNavigationAction = (action) => {
        this.setState({
            action,
        });
    };

    render() {
        const {transaction, stateDiffs, contracts, callTrace, eventLogs, stackTrace, project} = this.props;
        const {action} = this.state;

        if (!transaction) {
            return null;
        }

        return (
            <div className="TransactionPageContent">
                <TransactionGeneralInformation contracts={contracts} transaction={transaction} project={project}/>
                {!transaction.status && !!stackTrace && <TransactionStackTrace onNavigate={this.handleNavigationAction} stackTrace={stackTrace} contracts={contracts}/>}
                <TransactionExecution project={project} action={action} transaction={transaction} stateDiffs={stateDiffs} eventLogs={eventLogs} callTrace={callTrace} contracts={contracts}/>
            </div>
        )
    }
}

TransactionPageContent.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    contracts: PropTypes.array.isRequired,
    callTrace: PropTypes.object.isRequired,
    eventLogs: PropTypes.arrayOf(PropTypes.instanceOf(EventLog)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
    stackTrace: PropTypes.object,
    project: PropTypes.instanceOf(Project),
};

export default TransactionPageContent;
