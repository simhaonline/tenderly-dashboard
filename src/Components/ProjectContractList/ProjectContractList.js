import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {Project, ProjectContract} from "../../Core/models";

import {Table} from "../../Elements";
import {
    ProjectContractMainRevisionColumn,
    // ContractDeployedAtColumn,
    ProjectContractLatestTagColumn,
    NetworkColumn,
    ContractRevisionAddTagModal,
} from "../index";

import './ProjectContractList.scss';

const projectContractsTableConfiguration = [
    {
        label: "Contract",
        renderColumn: contract => <div>
            <span className="SemiBoldText FontSize4">{contract.name}</span>
        </div>
    },
    {
        label: "Latest Tag",
        renderColumn: (contract, metadata) => <ProjectContractLatestTagColumn projectContract={contract} onAddTagClick={metadata.handleAddTagClick}/>
    },
    {
        label: "Network",
        size: 160,
        renderColumn: contract => <NetworkColumn network={contract.network}/>,
    },
    {
        label: "Main Revision",
        renderColumn: contract => <ProjectContractMainRevisionColumn projectContract={contract}/>,
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
        addTagModalOpen: false,
        currentRevision: null,
    };

    /**
     * @param {ProjectContract} projectContract
     */
    handleProjectContractClick = (projectContract) => {
        const {history} = this.props;

        history.push(projectContract.getUrl());
    };

    /**
     * @param {boolean} value
     * @param {ProjectContractRevision} revision
     */
    setAddTagModal = (value, revision) => {
        this.setState({
            addTagModalOpen: value,
            currentRevision: revision,
        });
    };

    render() {
        const {projectContracts, project} = this.props;
        const {addTagModalOpen, currentRevision} = this.state;

        return (
            <div className="ProjectContractList">
                <Table configuration={projectContractsTableConfiguration} metadata={{
                    handleAddTagClick: (revision) => this.setAddTagModal(true, revision),
                }} data={projectContracts} onRowClick={this.handleProjectContractClick} keyAccessor="id"/>
                <ContractRevisionAddTagModal project={project} revision={currentRevision} open={addTagModalOpen} onClose={e => this.setAddTagModal(false, null)}/>
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
