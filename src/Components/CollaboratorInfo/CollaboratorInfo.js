import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {CollaboratorPermissionTypeDescriptionMap, CollaboratorPermissionTypeIconMap} from "../../Common/constants";

import {Collaborator} from "../../Core/models";

import {PanelDivider, Icon} from "../../Elements";

import './CollaboratorInfo.scss';

class CollaboratorInfo extends PureComponent {
    render() {
        const {collaborator} = this.props;

        return (
            <div className="CollaboratorInfo">
                <div className="MarginBottom2">
                    <span className="MutedText MarginRight2">Name:</span>
                    <span className="SemiBoldText">{collaborator.getFullName()}</span>
                </div>
                <div className="MarginBottom3">
                    <span className="MutedText MarginRight2">E-mail: </span>
                    <span className="SemiBoldText">{collaborator.email}</span>
                </div>
                <PanelDivider/>
                <h3>Permissions</h3>
                <div className="MarginTop2">
                    {Object.keys(collaborator.permissions).map(permission => <div key={permission} className="DisplayFlex AlignItemsCenter MarginBottom2">
                        <div className="CollaboratorInfo__PermissionDescription">
                            <Icon icon={CollaboratorPermissionTypeIconMap[permission]} className="MutedText MarginRight1"/>
                            {CollaboratorPermissionTypeDescriptionMap[permission]}
                        </div>
                        <div>
                            {collaborator.permissions[permission] && <span className="SuccessText SemiBoldText">Has permission</span>}
                            {!collaborator.permissions[permission] && <span className="DangerText SemiBoldText">Doesn't have permission</span>}
                        </div>
                    </div>)}
                </div>
                <PanelDivider/>
            </div>
        );
    }
}

CollaboratorInfo.propTypes = {
    collaborator: PropTypes.instanceOf(Collaborator).isRequired,
};

export default CollaboratorInfo;
