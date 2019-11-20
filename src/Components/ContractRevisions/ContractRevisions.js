import React from 'react';
import PropTypes from 'prop-types';

import {Contract, ProjectContract} from "../../Core/models";

/**
 * @param {ProjectContract} projectContract
 * @param {Contract[]} revisions
 */
const ContractRevisions = ({projectContract, revisions}) => {

    if (!projectContract || !revisions) return 'loading';

    console.log(projectContract, revisions);

    return (
        <div className="ContractRevisions">
            lala

        </div>
    );
};

ContractRevisions.propTypes = {
    projectContract: PropTypes.instanceOf(ProjectContract),
    revisions: PropTypes.instanceOf(Contract),
};

export default ContractRevisions;
