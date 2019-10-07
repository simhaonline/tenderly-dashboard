import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CollaboratorPermissionTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

class PermissionControl extends Component {
    render() {
        const {children} = this.props;

        return children;
    }
}

PermissionControl.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    requiredPermissions: PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(CollaboratorPermissionTypes)),
        PropTypes.arrayOf(PropTypes.oneOf(Object.values(CollaboratorPermissionTypes))),
    ]).isRequired,
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
)(PermissionControl);
