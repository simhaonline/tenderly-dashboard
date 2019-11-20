import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Blockies from "react-blockies";
import {Link} from "react-router-dom";

import {Contract, ProjectContract} from "../../Core/models";
import {Card, Tag, Toggle} from "../../Elements";

import './ContractRevisions.scss';

/**
 * @param {ProjectContract} projectContract
 * @param {Contract} currentContract
 * @param {Contract[]} contracts
 */
const ContractRevisions = ({projectContract, currentContract, contracts}) => {
    if (!projectContract || !contracts) return 'loading';

    return (
        <div className="ContractRevisions">
            {projectContract.revisions.map(revision => {
                const contract = contracts.find(c => c.id === revision.id);
                const isCurrent = contract.id === currentContract.id;

                return <Link key={revision.id} to={`${projectContract.getUrlForRevision(revision.id)}/revisions`}>
                    <Card className={classNames("DisplayFlex AlignItemsCenter ContractRevisions__Revision", {
                        "ContractRevisions__Revision--Active": isCurrent,
                    },)}>
                        <Blockies size={8} scale={5} className="BorderRadius1" seed={contract.id}/>
                        <div className="MarginLeft2">
                            <div className="SemiBoldText MarginBottom1">
                                <span className="FontSize4">{contract.name}</span>
                                {isCurrent && <Tag size="small" color="success-outline" className="MarginLeft1">Current Revision</Tag>}
                            </div>
                            <div className="MonospaceFont LinkText">{contract.address}</div>
                        </div>
                        <div className="MarginLeftAuto">
                            <Toggle value={revision.enabled}/>
                        </div>
                    </Card>
                </Link>;
            })}

        </div>
    );
};

ContractRevisions.propTypes = {
    projectContract: PropTypes.instanceOf(ProjectContract),
    currentContract: PropTypes.instanceOf(Contract),
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default ContractRevisions;
