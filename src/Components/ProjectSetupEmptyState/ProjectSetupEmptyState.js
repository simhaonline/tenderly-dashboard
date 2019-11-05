import React from 'react';

import {Panel, PanelContent, Button} from '../../Elements';

import EmptyStateImage from './no-contracts-watched.svg';

import './ProjectSetupEmptyState.scss';

/**
 * @param {Project} project
 * @param {boolean} open
 * @param {Function} onSetup
 */
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
                    <Button to={`/explorer`} outline color="secondary" className="EmptyStateButton">
                        <span>Discover Public Contracts</span>
                    </Button>
                    <Button to={`${project.getUrlBase()}/contracts/add`} color="secondary" className="EmptyStateButton">
                        <span>Add Contracts</span>
                    </Button>
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
