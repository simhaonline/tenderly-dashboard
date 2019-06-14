import React from 'react';
import PropTypes from 'prop-types';

import {UsernameStatusMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './UsernameStatusInfo.scss';

const UsernameStatusInfo = ({status}) => {
    return (
        <div className="UsernameStatusInfo">
            {status === UsernameStatusMap.VALIDATING && <div className="UsernameStatusText">
                <Icon icon="loader" className="UsernameValidationIcon"/>
                <span>Checking username...</span>
            </div>}
            {status === UsernameStatusMap.INVALID && <div className="InvalidUsername UsernameStatusText">
                <Icon icon="alert-triangle" className="UsernameValidationIcon"/>
                <span>This is not a valid username. Please use only letters, number, dashes and underscores.</span>
            </div>}
            {status === UsernameStatusMap.TAKEN && <div className="TakenUsername UsernameStatusText">
                <Icon icon="info" className="UsernameValidationIcon"/>
                <span>Unfortunately this username has already been taken.<br/>Please try another one.</span>
            </div>}
            {status === UsernameStatusMap.VALID && <div className="ValidUsername UsernameStatusText">
                <Icon icon="check-circle" className="UsernameValidationIcon"/>
                <span>This username is available.</span>
            </div>}
        </div>
    )
};

UsernameStatusInfo.propTypes = {
    status: PropTypes.string.isRequired,
};

export default UsernameStatusInfo;
