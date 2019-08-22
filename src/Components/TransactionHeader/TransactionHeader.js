import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import moment from 'moment';

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Panel, PanelContent, PanelDivider, Icon} from "../../Elements";
import {EtherscanLink, NetworkTag, TransactionStatusTag, CopyableText} from "../index";

import './TransactionHeader.scss';

const TransactionHeader = ({transaction, contracts}) => {
    let contractLink;

    const isInternal = transaction.isInternalTransaction(contracts);

    const contract = contracts.find(c => c.address === transaction.to);

    if (contract) {
        const networkRoute  = NetworkAppToRouteTypeMap[contract.network];

        if (contract.isPublic) {
            contractLink = `/contract/${networkRoute}/${contract.address}`;
        } else if (!isInternal) {
            contractLink = `/project/${contract.projectId}/contract/${networkRoute}/${contract.address}`;
        }
    }

    return (
        <Panel className="TransactionHeaderCard">
            <PanelContent>
                <div className="HashInfo">
                    <span>Transaction: </span>
                    <div className="DisplayFlex AlignItemsCenter">
                        <CopyableText text={transaction.txHash} onSuccessMessage="Copied transaction hash to clipboard"/>
                        <NetworkTag network={transaction.network} className="MarginLeft2"/>
                    </div>
                </div>
                <PanelDivider/>
                <div className="DisplayFlex FlexWrap">
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Status:</span>
                        <TransactionStatusTag status={transaction.status}/>
                    </div>
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Block:</span>
                        <EtherscanLink value={transaction.block} network={transaction.network} type={EtherscanLinkTypes.BLOCK}>
                            {transaction.block}
                        </EtherscanLink>
                    </div>
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Timestamp:</span>
                        <div className="TextAlignRight">
                            <span>{moment(transaction.timestamp).fromNow()} </span>
                            <span className="MutedText">({moment(transaction.timestamp).format('DD/MM/YYYY HH:mm:SS')})</span>
                        </div>
                    </div>
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Gas Used:</span>
                        <span>{transaction.gasUsed}</span>
                    </div>
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Nonce:</span>
                        <span>{transaction.nonce}</span>
                    </div>
                </div>
                <PanelDivider/>
                <div className="CallerInfo">
                    <div>
                        <div className="MutedText CallerLabel">Caller Address:</div>
                        <div>
                            <CopyableText text={transaction.from} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                        </div>
                    </div>
                    <div className="DirectionIconWrapper">
                        <Icon icon="arrow-right-circle"/>
                    </div>
                    <div>
                        <div className="MutedText CallerLabel">Contract Address:</div>
                        {!!contract && <Link to={contractLink}>{contract.name} ({transaction.to})</Link>}
                        {!contract && <div>
                            <CopyableText text={transaction.to} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                        </div>}
                    </div>
                </div>
            </PanelContent>
        </Panel>
    )
};

TransactionHeader.propTypes = {
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default TransactionHeader;
