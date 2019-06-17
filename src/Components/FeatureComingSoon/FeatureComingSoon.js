import React, {Component, Fragment} from 'react';

import {Icon, Panel, PanelContent} from "../../Elements";

import './FeatureComingSoon.scss';

class FeatureComingSoon extends Component {
    render() {
        const {feature} = this.props;

        return (
            <Panel>
                <PanelContent className="FeatureComingSoon">
                    {feature === 'alerting' && <Fragment>
                        <Icon icon="alerting" className="FeatureIcon"/>
                        <div className="FeatureName">Alerting</div>
                    </Fragment>}
                    {feature === 'analytics' && <Fragment>
                        <Icon icon="analytics" className="FeatureIcon"/>
                        <div className="FeatureName">Analytics</div>
                    </Fragment>}
                    <div className="FeatureDescription">This feature is currently in development.<br/>Stay tuned for updates.</div>
                </PanelContent>
            </Panel>
        );
    }
}

export default FeatureComingSoon;
