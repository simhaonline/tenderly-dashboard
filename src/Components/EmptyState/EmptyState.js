import React from 'react';
import PropTypes from 'prop-types';

import './EmptyState.scss';

const EmptyState = ({icon, title, description, renderActions}) => {
    return (
        <div className="EmptyState">
            <div className="EmptyState__Icon">
                <img src={icon} alt="Empty state icon" className="EmptyState__Icon__Image"/>
            </div>
            <div className="EmptyState__Title">{title}</div>
            <div className="EmptyState__Description">{description}</div>
            {!!renderActions && <div className="EmptyState__Actions">
                {renderActions()}
            </div>}
        </div>
    )
};

EmptyState.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    renderActions: PropTypes.func,
};

export default EmptyState;
