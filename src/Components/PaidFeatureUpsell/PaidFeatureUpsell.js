import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {Button} from "../../Elements";

import './PaidFeatureUpsell.scss';

const featureInformationMap = {
    "analytics": {
        label: "Analytics",
        imageLink: "/Assets/FeatureImages/analytics_feature_image.svg",
        keyFeatures: [
            {
                headline: "Real-time Data",
                description: "Some description goes here that describes this feature enough for it to be valuable"
            },
            {
                headline: "Custom Graphs",
                description: "Some description goes here that describes this feature enough for it to be valuable"
            },
        ]
    },
    "alerts": {
        label: "Alerting",
        imageLink: "/Assets/FeatureImages/alerting_feature_image.svg",
        keyFeatures: [],
    },
    "private-networks": {
        label: "Private Networks",
        keyFeatures: [],
    },
};

/**
 * @param {'analytics'|'alerts'|'private-networks'} feature
 * @param {boolean} loggedIn
 */
const PaidFeatureUpsell = ({feature, loggedIn}) => {
    const info = featureInformationMap[feature];

    return (
        <div className="PaidFeatureUpsell">
            <img className="PaidFeatureUpsell__Image" src={info.imageLink}/>
            <h1 className="PaidFeatureUpsell__Headline">{info.label}</h1>
            {info.keyFeatures.map((featureInfo, index) => <div key={index} className="PaidFeatureUpsell__FeatureItem">
                <h2>{featureInfo.headline}</h2>
                <p>{featureInfo.description}</p>
            </div>)}
            <div className="PaidFeatureUpsell__ActionsWrapper">
                {!loggedIn && <Fragment>
                    <Button className="MarginBottom1" to={{
                        pathname: "/register",
                        state: {
                            flow: "feature",
                            feature,
                        },
                    }}>
                        Create Account
                    </Button>
                    <Link to={{
                        pathname: "/login",
                        state: {
                            flow: "feature",
                            feature,
                        },
                    }}>Login</Link>
                </Fragment>}
                {loggedIn && <Button>
                    <span>Add to Project</span>
                </Button>}
            </div>
        </div>
    );
};

PaidFeatureUpsell.propTypes = {
    feature: PropTypes.oneOf(['analytics', 'alerts', 'private-networks']).isRequired,
};

export default PaidFeatureUpsell;
