import React, {Component} from 'react';

import DebuggingFeatureDemo from "./DebuggingFeatureDemo";

import './TenderlyFeaturesDemo.scss';

class TenderlyFeaturesDemo extends Component {
    state = {
        currentFeature: 'debugging',
    };

    render() {
        const {currentFeature} = this.state;

        return (
            <div className="TenderlyFeaturesDemo">
                {currentFeature === 'debugging' && <DebuggingFeatureDemo/>}
            </div>
        );
    }
}

export default TenderlyFeaturesDemo;
