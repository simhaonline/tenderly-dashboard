import React from 'react';

import EmptyStateImage from './no-projects-icon.svg';

import {Button, Panel, PanelContent} from "../../Elements";

import './NoProjectsEmptyState.scss';

const NoProjectsEmptyState = ({onTryExample}) => {
    return (
        <Panel>
            <PanelContent className="NoProjectsEmptyState">
                <div className="EmptyStateImageWrapper">
                    <img src={EmptyStateImage} className="EmptyStateImage" alt="Empty state" />
                </div>
                <h5 className="EmptyStateHeadline">Create your first project</h5>
                <p className="EmptyStateDescription">Upload your smart contracts or import them from Etherscan and start monitoring them. View transactions that fail in real-time and be alerted when ever that happens.</p>
                <div>
                    <Button className="EmptyStateButton" color="secondary" onClick={onTryExample} outline>
                        <span>Try Example Project</span>
                    </Button>
                    <Button className="EmptyStateButton" color="secondary" to="/project/create">
                        <span>Create a Project</span>
                    </Button>
                </div>
            </PanelContent>
        </Panel>
    );
};

export default NoProjectsEmptyState;
