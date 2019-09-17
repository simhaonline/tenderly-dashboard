import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {Contract} from "../../Core/models";
import {NetworkAppToRouteTypeMap} from "../../Common/constants";

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
        renderColumn: contract => <ContractDeployedAtColumn contract={contract}/>,
    },
    {
        label: "Listening",
        renderColumn: (contract, metadata) => <ContractListeningColumn contract={contract}
                                                           onToggle={metadata.handleListeningToggle}/>,
    },
    {
        label: "Files",
        renderColumn: contract => <ContractFilesColumn contract={contract}/>,
    },
];

const groupingConfiguration = [
    {
        renderColumn: groupData => <div>
            <span className="SemiBoldText">{groupData[0].name}</span>
        </div>,
    },
    {
        renderColumn: groupData => <NetworkColumn network={groupData[0].network}/>,
    },
    {
        renderColumn: () => <div/>,
    },
    {
        renderColumn: groupData => <div>{groupData.length} Revisions</div>,
    },
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
        const {history} = this.props;

        const networkRoute = NetworkAppToRouteTypeMap[contract.network];

        history.push(`/project/${contract.projectId}/contract/${networkRoute}/${contract.address}`);
    };

    render() {
        const {contracts} = this.props;

        return (
            <div className="ProjectContractList">
                <Table configuration={projectContractsTableConfiguration} data={contracts} keyAccessor="address"
                       groupBy="parent" groupingConfiguration={groupingConfiguration} metadata={{
                    handleListeningToggle: this.handleListeningToggle,
                }} onRowClick={this.handleContractClick}/>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    onListenToggle: PropTypes.func,
};

export default withRouter(ProjectContractList);
