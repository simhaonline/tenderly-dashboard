import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {Contract, ProjectContract} from "../../Core/models";
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

    render() {
        const {contracts, projectContracts} = this.props;

        return (
            <div className="ProjectContractList">
                {projectContracts.map(projectContract => <div key={projectContract.id}>
                    {projectContract.name}
                </div>)}
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    projectContracts: PropTypes.arrayOf(PropTypes.instanceOf(ProjectContract)),
    onListenToggle: PropTypes.func,
};

export default withRouter(ProjectContractList);
