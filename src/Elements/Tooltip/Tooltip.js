import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import './Tooltip.scss';

const Tooltip = ({id, placement, children}) => {
    return (
        <UncontrolledTooltip placement={placement} target={id} innerClassName="Tooltip__Content" className="Tooltip" hideArrow>
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