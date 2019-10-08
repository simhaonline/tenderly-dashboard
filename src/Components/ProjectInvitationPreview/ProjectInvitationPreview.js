import React from 'react';
import {Link} from "react-router-dom";

import {Card, Icon} from "../../Elements";

import LogoHorizontal from "../AppHeader/logo-horizontal.svg";

import './ProjectInvitationPreview.scss';

const ProjectInvitationPreview = ({showLogo, projectName, projectSlug, projectOwner, inviterName}) => {
    return (
        <div className="ProjectInvitationPreview">
            {showLogo && <Link to="/">
                <img className="ProjectInvitationPreview__Logo" src={LogoHorizontal} alt="Tenderly Logo"/>
            </Link>}
            <p className="TextAlignCenter MarginBottom3"><span className="SemiBoldText">{inviterName}</span> has invited you to the following project</p>
            <Card className="ProjectInvitationPreview__ProjectCard">
                <div className="ProjectInvitationPreview__ProjectCard__IconWrapper">
                    <Icon icon="organization"/>
                </div>
                <div className="ProjectInvitationPreview__ProjectCard__InfoWrapper">
                    <div className="ProjectInvitationPreview__ProjectCard__ProjectName">{projectName}</div>
                    <div className="ProjectInvitationPreview__ProjectCard__ProjectSlug">{projectOwner}/{projectSlug}</div>
                </div>
            </Card>
        </div>
    );
};

export default ProjectInvitationPreview;
