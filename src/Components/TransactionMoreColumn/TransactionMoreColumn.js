import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Project, Transaction} from "../../Core/models";

import {Icon, Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from '../../Elements';
import {EtherscanLink} from "../index";

import './TransactionMoreColumn.scss';

const TransactionMoreColumn = ({transaction, project}) => {
    let transactionRoute;

    const networkRoute = NetworkAppToRouteTypeMap[transaction.network];

    if (!project) {
        transactionRoute = `/tx/${networkRoute}/${transaction.txHash}`;
    } else {
        transactionRoute = `/${project.owner}/${project.slug}/tx/${networkRoute}/${transaction.txHash}`;
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

TransactionMoreColumn.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    project: PropTypes.instanceOf(Project),
};

export default TransactionMoreColumn;
