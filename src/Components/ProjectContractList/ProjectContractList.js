import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

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

class ProjectContractList extends Component{
    render() {
        const {contracts} = this.props;

        return (
            <div className="ProjectContractList">
                {contracts.map(contract =>
                    <ProjectContract key={contract.id} contract={contract} className="ProjectContractListItem"/>
                )}
                <Table configuration={projectContractsTableConfiguration} data={contracts} keyAccessor="address"
                       groupBy="name" groupingConfiguration={groupingConfiguration}/>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default ProjectContractList;
