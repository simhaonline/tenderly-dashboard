import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import moment from 'moment';
import {CopyToClipboard} from "react-copy-to-clipboard";

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";
import Notifications from '../../Utils/Notifications';

import {Panel, PanelContent, PanelDivider, Icon} from "../../Elements";
import {EtherscanLink, NetworkTag, TransactionStatusTag} from "../index";

import './TransactionHeader.scss';

const TransactionHeader = ({transaction, contracts}) => {
    let contractLink;

    const isInternal = transaction.isInternalTransaction(contracts);

    const contract = contracts.find(c => c.address === transaction.to);

    if (contract) {
        const networkRoute  = NetworkAppToRouteTypeMap[contract.network];

        if (contract.isPublic) {

            contractLink = `/contract/${networkRoute}/${contract.id}`;
        } else if (!isInternal) {
            contractLink = `/project/${contract.projectId}/contract/${networkRoute}/${contract.id}`;
        }
    }

    return (
        <Panel className="TransactionHeaderCard">
            <PanelContent>
                <div className="HashInfo">
                    <span>Transaction: </span>
                    <div className="DisplayFlex AlignItemsCenter">
                        <CopyToClipboard text={transaction.txHash} onCopy={() => Notifications.success({
                            title: "Copied transaction hash to clipboard",
                            icon: "clipboard",
                        })}>
                            <div className="TxHashWrapper DisplayFlex">
                                <div className="CopyIconWrapper">
                                    <Icon icon="copy"/>
                                </div>
                                <span className="TxHash">{transaction.txHash}</span>
                            </div>
                        </CopyToClipboard>
                        <NetworkTag network={transaction.network} className="MarginLeft2"/>
                    </div>
                </div>
                <PanelDivider/>
                <div className="SecondaryInfo DisplayFlex">
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
                        <div className="MutedText CallerLabel">From:</div>
                        <div>{transaction.from}</div>
                    </div>
                    <div className="DirectionIconWrapper">
                        <Icon icon="arrow-right-circle"/>
                    </div>
                    <div>
                        <div className="MutedText CallerLabel">To:</div>
                        {!!contract && <Link to={contractLink}>{contract.name} ({transaction.to})</Link>}
                        {!contract && <div>{transaction.to}</div>}
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
