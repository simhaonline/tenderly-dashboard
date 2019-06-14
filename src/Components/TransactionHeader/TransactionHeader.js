import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Panel, Icon} from "../../Elements";

import './TransactionHeader.scss';

const TransactionHeader = ({transaction, contract}) => {
    let backLink;
    let contractLink;

    const networkRoute  = NetworkAppToRouteTypeMap[contract.network];

    if (contract.isPublic) {
        backLink = `/contract/${networkRoute}/${contract.id}`;
        contractLink = `/contract/${networkRoute}/${contract.id}`;
    } else {
        backLink = `/project/${contract.projectId}/transactions`;
        contractLink = `/project/${contract.projectId}/contract/${networkRoute}/${contract.id}`;
    }

    return (
        <Fragment>
            <div className="TransactionHeader">
                <Link to={backLink} className="BackLink">
                    <Icon icon="arrow-left"/>
                </Link>
                <h2>Transaction</h2>
            </div>
            <Panel className="TransactionHeaderCard">
                <div className="HashInfo">
                    <span>Transaction Hash:</span>
                    <span className="TxHash">{transaction.txHash}</span>
                </div>
                <div className="CallerInfo">
                    <div>
                        <div className="MutedText CallerLabel">From:</div>
                        <div>{transaction.from}</div>
                    </div>
                    <div className="DirectionIconWrapper">
                        <Icon icon="arrow-right-circle"/>
                    </div>
                    <div>
                        <div className="MutedText CallerLabel">To:</div>
                        <Link to={contractLink}>{contract.name} ({transaction.to})</Link>
                    </div>
                </div>
            </Panel>
        </Fragment>
    )
};

TransactionHeader.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionHeader;
