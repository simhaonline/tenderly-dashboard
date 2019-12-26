import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {ProjectContract} from "../../Core/models";

import {Icon, Tag, LinkButton} from "../../Elements";

/**
 * @param {ProjectContract} projectContract
 * @param {Function} onAddTagClick
 */
const ProjectContractLatestTagColumn = ({projectContract, onAddTagClick}) => {
    const mainRevision = projectContract.getMainRevision();

    return (
        <div className="ProjectContractLatestTagColumn DisplayFlex AlignItemsCenter">
            {mainRevision.tags.length === 0 && <LinkButton onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onAddTagClick(mainRevision);
            }}>
                <Icon icon="plus"/>
                <span>Add tag</span>
            </LinkButton>}
            {mainRevision.tags.length > 0 && <Fragment>
                <Tag size="small" color="primary-outline">
                    <Icon icon="tag"/>
                    <span className="MonospaceFont">{mainRevision.tags[0].label}</span>
                </Tag>
            </Fragment>}
        </div>
    )
};

ProjectContractLatestTagColumn.propTypes = {
    projectContract: PropTypes.instanceOf(ProjectContract).isRequired,
    onAddTagClick: PropTypes.func.isRequired,
};

export default ProjectContractLatestTagColumn;
