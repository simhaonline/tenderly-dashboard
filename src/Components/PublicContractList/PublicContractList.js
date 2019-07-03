import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";
import {Contract} from "../../Core/models";

import {Table} from '../../Elements';
import {ContractAddressColumn, ContractNameColumn, ContractDeployedAtColumn, NetworkColumn} from "../index";

const publicContractsTableConfiguration = [
    {
        label: "Contract",
        renderColumn: contract => <ContractNameColumn contract={contract}/>,
    },
    {
        label: "Address",
        className: "HideMobile",
        renderColumn: contract => <ContractAddressColumn address={contract.address}/>,
    },
    {
        label: "Network",
        size: 120,
        renderColumn: contract => <NetworkColumn network={contract.network}/>,
    },
    {
        label: "Deployed",
        className: "HideMobile",
        renderColumn: contract => <ContractDeployedAtColumn contract={contract}/>,
    },
];

class PublicContractList extends Component {
    handleContractClick = (contract) => {
        const {history} = this.props;

        const networkRoute = NetworkAppToRouteTypeMap[contract.network];

        history.push(`/contract/${networkRoute}/${contract.address}`);
    };

    render() {
        const {contracts, loading} = this.props;

        return (
            <div className="PublicContractList">
                <Table data={contracts} configuration={publicContractsTableConfiguration}
                       onRowClick={this.handleContractClick} loading={loading}/>
            </div>
        )
    }
}

PublicContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    loading: PropTypes.bool,
};

export default withRouter(PublicContractList);
