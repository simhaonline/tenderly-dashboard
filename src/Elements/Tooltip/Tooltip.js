import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = ({id, placement, children}) => {
    return (
        <UncontrolledTooltip placement={placement} target={id}>
            {children}
        </UncontrolledTooltip>
    );
};

Tooltip.propTypes = {
    id: PropTypes.string.isRequired,
    placement: PropTypes.string,
};

Tooltip.defaultProps = {
    placement: "right",
};

export default Tooltip;
