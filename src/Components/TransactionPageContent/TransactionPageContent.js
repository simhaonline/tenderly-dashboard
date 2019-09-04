import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Transaction} from "../../Core/models";

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
        const {transaction, contracts, callTrace, stackTrace, projectId} = this.props;
        const {action} = this.state;

        return (
            <div className="TransactionPageContent">
                <TransactionGeneralInformation contracts={contracts} transaction={transaction}/>
                {!transaction.status && <TransactionStackTrace onNavigate={this.handleNavigationAction} stackTrace={stackTrace} contracts={contracts}/>}
                <TransactionExecution projectId={projectId} action={action} transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contracts={contracts}/>
            </div>
        )
    }
}

TransactionPageContent.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    contracts: PropTypes.array.isRequired,
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
    projectId: PropTypes.string,
};

export default TransactionPageContent;
