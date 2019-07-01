import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import Table from "../../Elements/Table/Table";
import {ProjectContract, ContractAddressColumn, ContractListeningColumn} from "../index";

import './ProjectContractList.scss';

const projectContractsTableConfiguration = [
    {
        label: "Contract",
        renderColumn: contract => <ContractAddressColumn address={contract.address}/>,
    },
    {
        label: "Listening",
        accessor: "name",
        renderColumn: (contract, metadata) => <ContractListeningColumn contract={contract}
                                                                       onToggle={metadata.handleListeningToggle}/>,
    },
];

const groupingConfiguration = [
    {},
];

class ProjectContractList extends Component{
    handleListeningToggle = (contract) => {
        console.log('toglg', contract);
    };

    render() {
        const {contracts} = this.props;

        return (
            <div className="ProjectContractList">
                {contracts.map(contract =>
                    <ProjectContract key={contract.id} contract={contract} className="ProjectContractListItem"/>
                )}
                <Table configuration={projectContractsTableConfiguration} data={contracts} keyAccessor="address"
                       groupBy="name" groupingConfiguration={groupingConfiguration} metadata={{
                    handleListeningToggle: this.handleListeningToggle,
                }}/>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    listenedContracts: PropTypes.arrayOf(PropTypes.string),
};

ProjectContractList.defaultProps = {
    listenedContracts: [],
};

export default ProjectContractList;
