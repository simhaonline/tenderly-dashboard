import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Blockies from "react-blockies";
import {withRouter} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {NetworkAppToRouteTypeMap, NetworkTypes} from "../../Common/constants";
import {isValidAddress, isValidTransactionHash} from "../../Utils/Ethereum";
import {generateShortAddress} from "../../Utils/AddressFormatter";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import {Icon, Card, CardsWrapper} from "../../Elements";
import {SimpleLoader, NetworkTag} from "../index";

import './PublicNetworksSearch.scss';

const ResultThumbnail = ({id, value, name, network, onClick = () => {}}) => {
    return (
        <Card onClick={onClick} clickable>
            <div className="DisplayFlex AlignItemsCenter MarginBottom2">
                <Blockies
                    seed={id}
                    size={8}
                    scale={5}
                    className="PublicContractThumbnail__Blockie"
                />
                <div className="MarginLeft2">
                    <div className="MarginBottom1">
                        <span className="SemiBoldText">{name}</span>
                    </div>
                    <div className="LinkText MonospaceFont">{generateShortAddress(value, 12 , 4)}</div>
                </div>
            </div>
            <div>
                <NetworkTag size="small" network={network}/>
            </div>
        </Card>
    );
};

class PublicNetworksSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            result: null,
        }
    }

    /**
     * @param {string} txHash
     * @return {Promise<Transaction[]|null>}
     */
    fetchPossibleTransaction = async (txHash) => {
        const {txActions} = this.props;

        const results = await Promise.all([
            txActions.fetchTransactionForPublicContract(txHash, NetworkTypes.MAIN, true),
            txActions.fetchTransactionForPublicContract(txHash, NetworkTypes.KOVAN, true),
            txActions.fetchTransactionForPublicContract(txHash, NetworkTypes.ROPSTEN, true),
            txActions.fetchTransactionForPublicContract(txHash, NetworkTypes.RINKEBY, true),
        ]);

        return results.filter(result => result.success).map(result => result.data.transaction);
    };

    /**
     * @param {string} address
     * @return {Promise<Contract[]|null>}
     */
    fetchPossibleContract = async (address) => {
        const {contractActions} = this.props;

        const results = await Promise.all([
            contractActions.fetchPublicContract(address, NetworkTypes.MAIN, true),
            contractActions.fetchPublicContract(address, NetworkTypes.KOVAN, true),
            contractActions.fetchPublicContract(address, NetworkTypes.ROPSTEN, true),
            contractActions.fetchPublicContract(address, NetworkTypes.RINKEBY, true),
        ]);

        return results.filter(result => result.success).map(result => result.data);
    };

    getValueType = (value) => {
        if (isValidAddress(value)) {
            return 'contract';
        }

        if (isValidTransactionHash(value)) {
            return 'tx';
        }

        return 'unknown';
    };

    handleSearch = async (event) => {
        const value = event.target.value;


        if (!value) {
            this.setState({
                result: null,
            });
            return;
        }

        const valueType = this.getValueType(value);

        const result = {
            type: valueType,
            values: null,
        };

        this.setState({
            loading: true,
            result: null,
        });

        Analytics.trackEvent('explore_page_search');

        if (valueType === 'contract') {
            result.values = await this.fetchPossibleContract(value);
        } else if (valueType === 'tx') {
            result.values = await this.fetchPossibleTransaction(value);
        }

        this.setState({
            loading: false,
            result,
        });
    };

    goTo = (type, network, suffix) => {
        const {history} = this.props;

        const networkRout = NetworkAppToRouteTypeMap[network];

        history.push(`/${type}/${networkRout}/${suffix}`);
    };

    render() {
        const {loading, result} = this.state;

        return (
            <div className="PublicNetworksSearch">
                <div className="PublicNetworksSearch__InputWrapper">
                    <input type="text" onChange={this.handleSearch} className="PublicNetworksSearch__Input" disabled={loading} placeholder="Enter any transaction or contract address"/>
                    <Icon icon="search" className="PublicNetworksSearch__InputIcon"/>
                </div>
                {loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    <SimpleLoader/>
                </div>}
                {!result && !loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">Find a transaction or contract</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Paste any transaction hash or contract address into input above and if it is from a publicly verified contract it will be parsed by us.</p>
                    </div>
                </div>}
                {!!result && !loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    {result.type === 'contract' && !!result.values.length && <CardsWrapper horizontal>
                        {result.values.map(contract =>
                            <ResultThumbnail key={contract.network} id={contract.getUniqueId()} value={contract.address} name={contract.name}
                                             network={contract.network} onClick={() => this.goTo(result.type, contract.network, contract.address)}/>
                        )}
                    </CardsWrapper>}
                    {result.type === 'tx'&& !!result.values.length && <CardsWrapper horizontal>
                        {result.values.map(tx =>
                            <ResultThumbnail key={tx.network} id={`${tx.network}:${tx.txHash}`} value={tx.txHash} name="Transaction" network={tx.network}
                                             onClick={() => this.goTo(result.type, tx.network, tx.txHash)}/>
                        )}
                    </CardsWrapper>}
                    {result.type !== 'unknown' && !result.values.length && <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">No Results Founds</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Seems that we haven't parsed this contract or transaction yet. Make sure that the contract or transaction is coming from a publicly verified contract on Etherscan.</p>
                    </div>}
                    {result.type === 'unknown' && <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">Invalid Query</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Whoops, seems that the query you have entered is not a valid contract address or transaction hash.</p>
                    </div>}
                </div>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        txActions: bindActionCreators(transactionActions, dispatch),
        contractActions: bindActionCreators(publicContractActions, dispatch),
    }
};

export default withRouter(connect(
    null,
    mapDispatchToProps,
)(PublicNetworksSearch));
