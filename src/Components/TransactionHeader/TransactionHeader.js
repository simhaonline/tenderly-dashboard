import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Card, Icon} from "../../Elements";

import './TransactionHeader.scss';

const TransactionHeader = ({transaction, contract}) => {
    let backLink;

    if (contract.isPublic) {
        const networkRoute  = NetworkAppToRouteTypeMap[contract.network];

        backLink = `/contract/${networkRoute}/${contract.id}`;
    } else {
        backLink = `/project/${contract.projectId}/transactions`
    }

    return (
        <Fragment>
            <div className="TransactionHeader">
                <Link to={backLink} className="BackLink">
                    <Icon icon="arrow-left"/>
                </Link>
                <h2>Transaction</h2>
            </div>
            <Card className="TransactionHeaderCard">
                {transaction.txHash}
            </Card>
        </Fragment>
    )
};

TransactionHeader.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionHeader;
