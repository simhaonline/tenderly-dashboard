import React from 'react';

import {Panel, PanelContent, Button} from '../../Elements';
import {ProjectSetupGuide} from "../index";

import EmptyStateImage from './no-contracts-watched.svg';

import './ProjectSetupEmptyState.scss';

const ProjectSetupEmptyState = ({project, open, onSetup}) => {
    return (
        <Panel>
            <PanelContent className="ProjectSetupEmptyState">
                <div className="EmptyStateImageWrapper">
                    <img src={EmptyStateImage} className="EmptyStateImage" alt="Empty state" />
                </div>
                <h4 className="EmptyStateHeadline">No contracts monitored</h4>
                <p className="EmptyStateDescription">You can start monitoring by uploading your <span className="SemiBoldText">private smart contracts</span> to the dashboard or by importing an already verified <span className="SemiBoldText">public contract</span>. </p>
                <div className="EmptyStateActions">
                    <Button to={`/public-contracts`} outline color="secondary" className="EmptyStateButton">
                        <span>Discover Public Contracts</span>
                    </Button>
                    <ProjectSetupGuide buttonClassName="EmptyStateButton" project={project} open={open} onSetup={onSetup} label="Add Contracts" color="secondary" outline={false}/>
                </div>
            </PanelContent>
        </Panel>
    );
};

ProjectSetupEmptyState.defaultProps = {
    open: false,
    onSetup: () => {},
};

export default ProjectSetupEmptyState;
