import React from 'react';

import {Card} from "../../Elements";

import './ProjectSetupGuide.css';

const ProjectSetupGuide = () => {
    return (
        <Card className="ProjectSetupGuide">
            <h2>Project setup</h2>
            <div className="ProjectSetupWrapper">
                <p>In order to monitor your contracts you need to install tenderly cli and have truffle configured</p>
                <p>To install tenderly</p>
                <p>On macOS</p>
                <code>
                    brew tap tenderly/tenderly
                    <br/>
                    brew install tenderly
                </code>
                <p>To login into your tenderly account</p>
                <code>
                    tenderly login
                </code>
                <p>In your project folder where truffle is configured run</p>
                <code>
                    tenderly init
                </code>
                <p>Start monitoring your contracts by doing</p>
                <code>
                    tenderly push
                </code>
            </div>
        </Card>
    );
};

export default ProjectSetupGuide;
