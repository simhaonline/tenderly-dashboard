import React from 'react';
import PropTypes from 'prop-types';

import KyberNetworkLogo from './kyber-logo-text-white.png';

import {CompanyNameMap, CompanyTypes} from "../../Common/constants";

import './CompanyLogo.scss';

const CompanyLogo = ({company}) => {
    let imageSrc;

    switch (company) {
        case CompanyTypes.KYBER_NETWORK:
            imageSrc = KyberNetworkLogo;
            break;
        default:
            break;
    }

    return <div className="CompanyLogo">
        <img src={imageSrc} alt={CompanyNameMap[company]}/>
    </div>
};

CompanyLogo.propTypes = {
    company: PropTypes.oneOf(Object.values(CompanyTypes)),
};

export default CompanyLogo;
