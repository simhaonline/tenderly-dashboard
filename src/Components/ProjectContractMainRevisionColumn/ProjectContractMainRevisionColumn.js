import React from 'react';
import PropTypes from 'prop-types';

import {ProjectContract} from "../../Core/models";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Tooltip} from "../../Elements";

import './ProjectContractMainRevisionColumn.scss';
import Blockies from "react-blockies";

const ProjectContractMainRevisionColumn = ({projectContract}) => {
    const mainRevision = projectContract.getMainRevision();

    return (
        <div className="ProjectContractMainRevisionColumn">
            <Blockies
                seed={mainRevision.id}
                size={8}
                scale={3}
                className="BorderRadius1 MarginRight2"
            />
            <span id={`ProjectContractMainRevisionColumn--${mainRevision.id.replace(':', '_')}`}>
                {generateShortAddress(mainRevision.address, 12, 4)}
            </span>
            <Tooltip id={`ProjectContractMainRevisionColumn--${mainRevision.id.replace(':', '_')}`}>{mainRevision.address}</Tooltip>
        </div>
    )
};

ProjectContractMainRevisionColumn.propTypes = {
    projectContract: PropTypes.instanceOf(ProjectContract),
};

export default ProjectContractMainRevisionColumn;
