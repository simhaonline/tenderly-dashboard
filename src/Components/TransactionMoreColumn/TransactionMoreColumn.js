import React from 'react';
import {Link} from 'react-router-dom';

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Icon, Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from '../../Elements';
import {EtherscanLink} from "../index";

import './TransactionMoreColumn.scss';

const TransactionMoreColumn = ({transaction}) => {
    let transactionRoute;

    const networkRoute = NetworkAppToRouteTypeMap[transaction.network];

    if (!transaction.projectId) {
        transactionRoute = `/tx/${networkRoute}/${transaction.txHash}`;
    } else {
        transactionRoute = `/project/${transaction.projectId}/tx/${networkRoute}/${transaction.txHash}`;
    }

    return (
        <div>
            <Dropdown>
                <DropdownToggle tag="div" className="Dropdown__Toggle">
                    <Icon icon="more-vertical" className="MoreIcon"/>
                </DropdownToggle>
                <DropdownMenu>
                    <Link to={transactionRoute}>
                        <DropdownItem>Open Transaction</DropdownItem>
                    </Link>
                    <EtherscanLink type={EtherscanLinkTypes.TRANSACTION} network={transaction.network} value={transaction.txHash}>
                        <DropdownItem>View in Explorer</DropdownItem>
                    </EtherscanLink>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default TransactionMoreColumn;
