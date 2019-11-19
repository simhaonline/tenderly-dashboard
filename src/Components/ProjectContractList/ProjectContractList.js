import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";
import {Link} from "react-router-dom";

import {Project, ProjectContract} from "../../Core/models";
// import {NetworkTypes} from "../../Common/constants";

import {Card, Icon, Input} from "../../Elements";
import {
    // ContractAddressColumn,
    // ContractDeployedAtColumn,
    // ContractListeningColumn,
    // ContractFilesColumn,
    // NetworkColumn,
    NetworkTag
} from "../index";

import './ProjectContractList.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

// const projectContractsTableConfiguration = [
//     {
//         label: "Contract",
//         renderColumn: contract => <ContractAddressColumn address={contract.address}/>,
//     },
//     {
//         label: "Added",
//         size: 260,
//         renderColumn: contract => <ContractDeployedAtColumn contract={contract}/>,
//     },
//     {
//         label: "Listening",
//         size: 150,
//         renderColumn: (contract, metadata) => <ContractListeningColumn contract={contract}
//                                                            onToggle={metadata.handleListeningToggle}/>,
//     },
//     {
//         label: "Files",
//         renderColumn: (contract, metadata) => <ContractFilesColumn contract={contract}
//                                                                    tags={metadata.contractTags ? metadata.contractTags[contract.id] : []}/>,
//     },
// ];
//
// const groupingConfiguration = [
//     {
//         renderColumn: groupData => <div>
//             <span className="SemiBoldText">{groupData[0].name}</span>
//         </div>,
//     },
//     {
//         size: 260,
//         renderColumn: groupData => <NetworkColumn network={groupData[0].network}/>,
//     },
//     {
//         size: 150,
//         renderColumn: () => <div/>,
//     },
//     {
//         renderColumn: groupData => <div>{groupData.length} Revisions</div>,
//     },
// ];
//
// const groupSorting = [
//     NetworkTypes.MAIN,
//     NetworkTypes.KOVAN,
//     NetworkTypes.ROPSTEN,
//     NetworkTypes.RINKEBY,
//     NetworkTypes.GOERLI,
// ];

/**
 * @param {ProjectContract} projectContract
 */
const ProjectContractListItem = ({projectContract}) => {
    const mainRevision = projectContract.getMainRevision();

    return <Link to={projectContract.getUrl()} key={projectContract.id} className="ProjectContractList__Item">
        <Card clickable>
            <div className="DisplayFlex AlignItemsCenter">
                <NetworkTag size="small" network={projectContract.network}/>
                <div className="MarginLeft2">
                    <div className="SemiBoldText MarginBottom1">{projectContract.name}</div>
                    <div className="LinkText MonospaceFont">{generateShortAddress(mainRevision.address, 12, 6)}</div>
                </div>
            </div>
            <div className="MarginTop2">
                {projectContract.revisions.map(revision => <div key={revision.id} className="DisplayFlex AlignItemsCenter MarginBottom1">
                    <Blockies size={8} scale={3} className="BorderRadius1 MarginRight2" seed={revision.id}/>
                    <div className="LinkText MonospaceFont">{generateShortAddress(revision.address, 12, 6)}</div>
                </div>)}
            </div>
            <div className="ProjectContractList__Item__AddedByWrapper">
                <div className="DisplayFlex AlignItemsCenter">
                    <div></div>
                    <div className="MarginLeft2">
                        <div>Miljan Tekic</div>
                        <div>Pushed 5 hours ago</div>
                    </div>
                    <div className="MarginLeftAuto TextAlignRight">
                        {mainRevision.tags.length > 0 && <div>
                            <Icon icon="tag" className="MarginRight1"/>
                            <span>{mainRevision.getLatestTag().label}</span>
                        </div>}
                        <div>
                            <span>View Push</span>
                            <Icon icon="external-link" className="MarginLeft1"/>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </Link>
};

class ProjectContractList extends Component{
    state = {
        searchQuery: '',
    };

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
        const {projectContracts, project} = this.props;
        const {searchQuery} = this.state;

        return (
            <div className="ProjectContractList">
                {projectContracts.length > 12 && <div className="ProjectContractList__FilterWrapper">
                    <div className="MaxWidth480">
                        <Input icon="filter" autoComplete="off" label="Filter contracts" field="searchQuery"  value={searchQuery}/>
                    </div>
                </div>}
                <div className="ProjectContractList__ItemsWrapper">
                    {projectContracts.map(projectContract => <ProjectContractListItem key={projectContract.id} projectContract={projectContract}/>)}
                    <Link to={`/${project.owner}/${project.slug}/contracts/add`} className="ProjectContractList__Item ProjectContractList__Item--AddContract">
                        <Card clickable>
                            <Icon icon="plus"/>
                            <div>Add</div>
                        </Card>
                    </Link>
                </div>
            </div>
        )
    }
}

ProjectContractList.propTypes = {
    projectContracts: PropTypes.arrayOf(PropTypes.instanceOf(ProjectContract)),
    onListenToggle: PropTypes.func,
    project: PropTypes.instanceOf(Project).isRequired,
};

export default ProjectContractList;
