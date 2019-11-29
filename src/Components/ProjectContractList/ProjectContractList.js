import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {Project, ProjectContract} from "../../Core/models";

import {Table} from "../../Elements";
import {
    // ContractAddressColumn,
    // ContractDeployedAtColumn,
    // ContractListeningColumn,
    // ContractFilesColumn,
    // NetworkColumn,
} from "../index";

import './ProjectContractList.scss';

const projectContractsTableConfiguration = [
    {
        label: "Contract",
        accessor: 'name',
    },
];

// const groupSorting = [
//     NetworkTypes.MAIN,
//     NetworkTypes.KOVAN,
//     NetworkTypes.ROPSTEN,
//     NetworkTypes.RINKEBY,
//     NetworkTypes.GOERLI,
// ];

class ProjectContractList extends Component{
    state = {
        searchQuery: '',
    };

    /**
     * @param {ProjectContract} projectContract
     */
    handleProjectContractClick = (projectContract) => {
        const {history} = this.props;

        history.push(projectContract.getUrl());
    };

    render() {
        const {projectContracts} = this.props;

        return (
            <div className="ProjectContractList">
                <Table configuration={projectContractsTableConfiguration} data={projectContracts} onRowClick={this.handleProjectContractClick} keyAccessor="id"/>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    projectContracts: PropTypes.arrayOf(PropTypes.instanceOf(ProjectContract)),
    onListenToggle: PropTypes.func,
    project: PropTypes.instanceOf(Project).isRequired,
};

export default withRouter(ProjectContractList);
