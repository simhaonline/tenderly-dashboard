import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import './Tooltip.scss';

const Tooltip = ({id, placement, className, showDelay, hideDelay, children}) => {
    return (
        <UncontrolledTooltip delay={{
            show: showDelay,
            hide: hideDelay,
        }} flip={false} placement={placement} target={id} innerClassName={`Tooltip__Content ${className}`} className="Tooltip" hideArrow>
            {children}
        </UncontrolledTooltip>
    );
};

Tooltip.propTypes = {
    id: PropTypes.string.isRequired,
    placement: PropTypes.string,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
};

Tooltip.defaultProps = {
    placement: "right",
    showDelay: 250,
    hideDelay: 0,
};

export default Tooltip;
