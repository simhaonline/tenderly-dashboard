import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import moment from 'moment';
import _ from 'lodash';

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {EtherscanLinkTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

import {Panel, PanelContent, PanelDivider, Icon, Tag} from "../../Elements";
import {EtherscanLink, NetworkTag, TransactionStatusTag, CopyableText} from "../index";

import './TransactionGeneralInformation.scss';

const TransactionGeneralInformation = ({transaction, contracts, project}) => {
    let contractLink;

    const isInternal = transaction.isInternalTransaction(contracts);

    const contract = contracts.find(c => c.address === transaction.to);
    let toAddress = transaction.to;

    if (contract) {
        const networkRoute  = getRouteSlugForNetwork(contract.network);

        if (contract.isPublic) {
            contractLink = `/contract/${networkRoute}/${contract.address}`;
        } else if (!isInternal) {
            contractLink = `/${project.owner}/${project.slug}/contract/${networkRoute}/${contract.address}`;
        }
    } else if (!transaction.to && transaction.contracts && transaction.contracts.length === 2) {
        toAddress = _.without(transaction.contracts, transaction.from)[0];
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
                            <span className="MutedText">({moment(transaction.timestamp).format('DD/MM/YYYY HH:mm:ss')})</span>
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
                {!!transaction.value && <div className="DisplayFlex FlexWrap MarginTop3">
                    <div className="DisplayFlex AlignItemsStart MarginRight4">
                        <span className="MarginRight2 SemiBoldText">Value:</span>
                        {transaction.value.length > 2 && <span>{parseFloat(parseInt(transaction.value) / Math.pow(10, 18)).toFixed(2)} ETH</span>}
                        {transaction.value.length === 2 && <span>0 ETH</span>}
                    </div>
                </div>}
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
                        {!!contract && <Link to={contractLink}>{contract.name} ({toAddress})</Link>}
                        {!contract && <div>
                            {!transaction.to && <Tag color="success" size="small" className="MarginRight1 MonospaceFont">New</Tag>}
                            <CopyableText text={toAddress} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                        </div>}
                    </div>
                </div>
            </PanelContent>
        </Panel>
    )
};

TransactionGeneralInformation.propTypes = {
    transaction: PropTypes.object.isRequired,
    project: PropTypes.instanceOf(Project),
    contracts: PropTypes.array.isRequired,
};

export default TransactionGeneralInformation;
