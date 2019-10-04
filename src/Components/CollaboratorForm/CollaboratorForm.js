import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Collaborator} from "../../Core/models";

class CollaboratorForm extends Component {
    render() {
        return (
            <div>
                form for collab
            </div>
        );
    }
}

CollaboratorForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    collaborator: PropTypes.instanceOf(Collaborator),
};

export default CollaboratorForm;
