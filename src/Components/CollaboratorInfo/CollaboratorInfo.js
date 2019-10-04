import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Collaborator} from "../../Core/models";

import './CollaboratorInfo.scss'

class CollaboratorInfo extends PureComponent {
    render() {
        return (
            <div className="CollaboratorInfo">

            </div>
        );
    }
}

CollaboratorInfo.propTypes = {
    collaborator: PropTypes.instanceOf(Collaborator).isRequired,
};

export default CollaboratorInfo;
