import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Panel, PanelContent, PanelDivider, Icon} from "../../Elements";

import './TransactionHeader.scss';

const TransactionHeader = ({transaction, contract}) => {
    let contractLink;

    const networkRoute  = NetworkAppToRouteTypeMap[contract.network];

    if (contract.isPublic) {
        contractLink = `/contract/${networkRoute}/${contract.id}`;
    } else {
        contractLink = `/project/${contract.projectId}/contract/${networkRoute}/${contract.id}`;
    }

    return (
        <Panel className="TransactionHeaderCard">
            <PanelContent>
                <div className="HashInfo">
                    <span>Transaction Hash:</span>
                    <span className="TxHash">{transaction.txHash}</span>
                </div>
                <PanelDivider/>
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
            </PanelContent>
        </Panel>
    )
};

TransactionHeader.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionHeader;
