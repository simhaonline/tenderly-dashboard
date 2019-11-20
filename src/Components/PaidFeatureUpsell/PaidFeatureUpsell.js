import React from 'react';
import PropTypes from 'prop-types';

const PaidFeatureUpsell = ({feature}) => {
    return (
        <div>

        </div>
    );
};

PaidFeatureUpsell.propTypes = {
    feature: PropTypes.oneOf(['analytics', 'alerts', 'private-networks']).isRequired,
};

export default PaidFeatureUpsell;
