import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from "../../Elements";

import './EmptyState.scss';

const EmptyState = ({image, icon, title, description, renderActions}) => {
    return (
        <div className="EmptyState">
            <div className="EmptyState__Icon">
                {!!image && <img src={image} alt="Empty state icon" className="EmptyState__Icon__Image"/>}
                {icon}
                {!!icon && <Icon icon={icon}/>}
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
    image: PropTypes.node,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    renderActions: PropTypes.func,
};

export default EmptyState;
