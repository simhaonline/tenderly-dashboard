import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {Contract} from "../../Core/models";
import {NetworkTypes} from "../../Common/constants";

import Table from "../../Elements/Table/Table";
import {
    ContractAddressColumn,
    ContractDeployedAtColumn,
    ContractListeningColumn,
    ContractFilesColumn,
    NetworkColumn
} from "../index";

import './ProjectContractList.scss';

const projectContractsTableConfiguration = [
    {
        label: "Contract",
        renderColumn: contract => <ContractAddressColumn address={contract.address}/>,
    },
    {
        label: "Added",
        size: 260,
        renderColumn: contract => <ContractDeployedAtColumn contract={contract}/>,
    },
    {
        label: "Listening",
        size: 150,
        renderColumn: (contract, metadata) => <ContractListeningColumn contract={contract}
                                                           onToggle={metadata.handleListeningToggle}/>,
    },
    {
        label: "Files",
        renderColumn: (contract, metadata) => <ContractFilesColumn contract={contract}
                                                                   tags={metadata.contractTags ? metadata.contractTags[contract.id] : []}/>,
    },
];

const groupingConfiguration = [
    {
        renderColumn: groupData => <div>
            <span className="SemiBoldText">{groupData[0].name}</span>
        </div>,
    },
    {
        size: 260,
        renderColumn: groupData => <NetworkColumn network={groupData[0].network}/>,
    },
    {
        size: 150,
        renderColumn: () => <div/>,
    },
    {
        renderColumn: groupData => <div>{groupData.length} Revisions</div>,
    },
];

const groupSorting = [
    NetworkTypes.MAIN,
    NetworkTypes.KOVAN,
    NetworkTypes.ROPSTEN,
    NetworkTypes.RINKEBY,
    NetworkTypes.GOERLI,
];

class ProjectContractList extends Component{
    /**
     * @param {Contract} contract
     */
    handleListeningToggle = (contract) => {
        const {onListenToggle} = this.props;

        if (onListenToggle) {
            onListenToggle(contract);
        }
    };

    handleContractClick = (contract) => {
        const {history, match: {params: {username, slug}}} = this.props;

        const networkRoute = getRouteSlugForNetwork(contract.network);

        history.push(`/${username}/${slug}/contract/${networkRoute}/${contract.address}`);
    };

    render() {
        const {contracts, contractTags} = this.props;

        return (
            <div className="ProjectContractList">
                <Table configuration={projectContractsTableConfiguration} data={contracts} keyAccessor="address"
                       groupBy={(contract) => `${contract.network}:${contract.parent}`} sortGroupBy={group => groupSorting.indexOf(group[0].network)}
                       groupingConfiguration={groupingConfiguration} metadata={{
                    contractTags,
                    handleListeningToggle: this.handleListeningToggle,
                }} onRowClick={this.handleContractClick}/>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    contractTags: PropTypes.object,
    onListenToggle: PropTypes.func,
};

export default withRouter(ProjectContractList);
