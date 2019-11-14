import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";
import {Link, withRouter} from "react-router-dom";

import {Contract, ProjectContract} from "../../Core/models";
import {NetworkTypes} from "../../Common/constants";

import {Card, Icon, Input} from "../../Elements";
import {
    ContractAddressColumn,
    ContractDeployedAtColumn,
    ContractListeningColumn,
    ContractFilesColumn,
    NetworkColumn, NetworkTag
} from "../index";

import './ProjectContractList.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

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
        const {contracts, projectContracts} = this.props;
        const {searchQuery} = this.state;

        return (
            <div className="ProjectContractList">
                {projectContracts.length > 12 && <div className="ProjectContractList__FilterWrapper">
                    <div className="MaxWidth480">
                        <Input icon="filter" autoComplete="off" label="Filter contracts" field="searchQuery"  value={searchQuery}/>
                    </div>
                </div>}
                <div className="ProjectContractList__ItemsWrapper">
                    {projectContracts.map(projectContract => <Link to={projectContract.getUrl()} key={projectContract.id} className="ProjectContractList__Item">
                        <Card clickable>
                            <div className="DisplayFlex AlignItemsCenter">
                                <Blockies size={8} scale={5} className="BorderRadius2" seed={projectContract.contractId}/>
                                <div className="MarginLeft2">
                                    <div className="SemiBoldText MarginBottom1">{projectContract.name}</div>
                                    <div className="LinkText MonospaceFont">{generateShortAddress(projectContract.address, 12, 6)}</div>
                                </div>
                            </div>
                            <div className="MarginTop2">
                                <NetworkTag size="small" network={projectContract.network}/>

                            </div>
                            <div className="ProjectContractList__Item__AddedByWrapper">
                                <div className="DisplayFlex AlignItemsCenter">
                                    <div></div>
                                    <div className="MarginLeft2">
                                        <div>Miljan Tekic</div>
                                        <div>Pushed 5 hours ago</div>
                                    </div>
                                    <div className="MarginLeftAuto TextAlignRight">
                                        {projectContract.tags.length > 0 && <div>
                                            <Icon icon="tag" className="MarginRight1"/>
                                            <span>{projectContract.getLatestTag().label}</span>
                                        </div>}
                                        <div>
                                            <span>View Push</span>
                                            <Icon icon="external-link" className="MarginLeft1"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>)}
                </div>
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
