import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Button, Card, Icon} from "../../Elements";

import EtherscanLink from "../EtherscanLink/EtherscanLink";
import NetworkTag from "../NetworkTag/NetworkTag";

import './ContractInformation.css';

class ContractInformation extends Component {
    goBack = () => {
        const {history} = this.props;

        history.goBack();
    };

    render() {
        const {contract, back} = this.props;
        const networkType = NetworkAppToRouteTypeMap[contract.network];

        return (
            <div className="ContractInformation">
                <div className="ContractName">
                    {back && <Button onClick={this.goBack} outline color="secondary" className="BackButton">
                        <Icon icon="corner-up-left"/>
                    </Button>}
                    <div className="NetworkWrapper"><NetworkTag network={contract.network}/></div>
                    <h2 className="NameWrapper§"><Link to={`/contract/${networkType}/${contract.id}`}>{contract.name}</Link></h2>
                </div>
                <Card className="ContractDetails">
                    <div className="DetailsWrapper">
                        <div className="DetailLabel">Address:</div>
                        <div className="DetailValue">
                            <EtherscanLink network={contract.network} type={EtherscanLinkTypes.ADDRESS} value={contract.address}>{contract.address}</EtherscanLink>
                        </div>
                    </div>
                    <div className="DetailsWrapper">
                        <div className="DetailLabel">Solidity Verson:</div>
                        <div className="DetailValue">{contract.solidity}</div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(ContractInformation);
