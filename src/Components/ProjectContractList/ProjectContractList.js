import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";
import {Link} from "react-router-dom";
import _ from 'lodash';

import {Project, ProjectContract} from "../../Core/models";
// import {NetworkTypes} from "../../Common/constants";

import {Card, Icon, Tag, Input} from "../../Elements";
import {
    // ContractAddressColumn,
    // ContractDeployedAtColumn,
    // ContractListeningColumn,
    // ContractFilesColumn,
    // NetworkColumn,
    NetworkTag, PageLink
} from "../index";

import './ProjectContractList.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";
import {getLabelForNetwork} from "../../Utils/NetworkHelpers";

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

    return <PageLink to={projectContract.getUrl()} className="ProjectContractList__Item">
        <Card clickable>
            <div className="ProjectContractList__Item__ContractInfo">
                <div className="SemiBoldText MarginBottom1 ProjectContractList__Item__ContractName">{projectContract.name}</div>
                <div className="LinkText MonospaceFont ProjectContractList__Item__Address">{generateShortAddress(mainRevision.address, 12, 6)}</div>
            </div>
            <div className="MarginTop2">
                {projectContract.revisions.map(revision => <div key={revision.id} className="DisplayFlex AlignItemsCenter MarginBottom1">
                    <Blockies size={8} scale={3} className="BorderRadius1 MarginRight2" seed={revision.id}/>
                    <div className="LinkText MonospaceFont">{generateShortAddress(revision.address, 12, 6)}</div>
                    {mainRevision.address === revision.address && projectContract.revisions.length > 1 && <Tag className="MarginLeftAuto" size="small" color="success-outline">Active</Tag>}
                </div>)}
            </div>
            <div className="ProjectContractList__Item__AddedByWrapper">
                <div className="DisplayFlex AlignItemsCenter">
                    <img src={`https://www.gravatar.com/avatar/testpusher?s=32&d=identicon`} alt="User Avatar" className="ProjectContractList__Item__AddedByWrapper__Image"/>
                    <div className="MarginLeft1">
                        <div className="SemiBoldText">Miljan Tekic</div>
                        <div className="MutedText FontSize2">Pushed 5 hours ago</div>
                    </div>
                    <div className="MarginLeftAuto TextAlignRight">
                        {mainRevision.tags.length > 0 && <div>
                            <Icon icon="tag" className="MarginRight1"/>
                            <span>{mainRevision.getLatestTag().label}</span>
                        </div>}
                        <Link>
                            <span>View Push</span>
                            <Icon icon="external-link" className="MarginLeft1"/>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    </PageLink>
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

        const groupedContracts = _.groupBy(projectContracts,'network');

        return (
            <div className="ProjectContractList">
                {projectContracts.length > 12 && <div className="ProjectContractList__FilterWrapper">
                    <div className="MaxWidth480">
                        <Input icon="filter" autoComplete="off" label="Filter contracts" field="searchQuery"  value={searchQuery}/>
                    </div>
                </div>}
                {Object.keys(groupedContracts).map(network => <div key={network}>
                    <div className="ProjectContractList__NetworkHeading">
                        <div>
                            <NetworkTag network={network}/>
                            <span className="SemiBoldText FontSize4 MarginLeft2">{getLabelForNetwork(network)}</span>
                            <span className="MarginLeft1 MutedText"><Icon icon="file-text"/> {groupedContracts[network].length} Contracts</span>
                        </div>
                        <div className="MarginLeftAuto Padding1">
                            <Icon icon="chevron-down"/>
                        </div>
                    </div>
                    <div className="ProjectContractList__ItemsWrapper">
                        {groupedContracts[network].map(projectContract => <ProjectContractListItem key={projectContract.id} projectContract={projectContract}/>)}
                        <Link to={`/${project.owner}/${project.slug}/contracts/add`} className="ProjectContractList__Item ProjectContractList__Item--AddContract">
                            <Card className="ProjectContractList__Item__Card">
                                <Icon icon="plus" className="FontSize4 MarginBottom4"/>
                                <div>Add Contract</div>
                            </Card>
                        </Link>
                    </div>
                </div>)}
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
