import React from 'react';

import Table from "../../Elements/Table/Table";
import {ProjectContract, ContractAddressColumn} from "../index";

import './ProjectContractList.scss';

const projectContractsTableConfiguration = [
    {
        label: "Contract",
        renderColumn: row => <ContractAddressColumn address={row.address}/>
    },
    {
        label: "Listening",
        accessor: "name",
    },
];

const groupingConfiguration = [
    {},
];

const ProjectContractList = ({contracts}) => {
    return (
        <div className="ProjectContractList">
            {contracts.map(contract =>
                <ProjectContract key={contract.id} contract={contract} className="ProjectContractListItem"/>
            )}
            <Table configuration={projectContractsTableConfiguration} data={contracts} keyAccessor="address"
                   groupBy="name" groupingConfiguration={groupingConfiguration}/>
        </div>
    )
};

export default ProjectContractList;
