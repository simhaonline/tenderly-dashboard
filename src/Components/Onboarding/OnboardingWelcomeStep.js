import React from 'react';

import {Icon} from "../../Elements";

import './OnboardingWelcomeStep.scss';

const OnboardingWelcomeStep = ({user, }) => {
    return (
        <div className="OnboardingWelcomeStep">
            <h1 className="OnboardingTitle">Welcome {user.firstName}</h1>
            <div className="CreationPillsWrapper">
                <div className="CreationPill">
                    <Icon icon="project" className="PillIcon"/>
                    <h4 className="PillTitle">Create Project</h4>
                    <p className="PillDescription">If you're a freelancer or hobbyist and want to watch over your projects start now by creating one!</p>
                </div>
                <div className="CreationPill">
                    <Icon icon="organization" className="PillIcon"/>
                    <h4 className="PillTitle">Create Organization</h4>
                    <p className="PillDescription">Organizations are meant for Companies that wish to have control over user management and manage their Blockchain projects on a company level.</p>
                </div>
            </div>
            <p className="AdditionalInfo">You can always do this later.</p>
        </div>
    )
};

export default OnboardingWelcomeStep;
