import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Tag.scss';

const tagSizeClassMap = {
    "small": "Tag--Small",
};

const tagColorClassMap = {
    "primary-outline": "Tag--PrimaryOutline",
    "secondary": "Tag--Secondary",
    "secondary-outline": "Tag--SecondaryOutline",
    "success": "Tag--Success",
    "success-outline": "Tag--SuccessOutline",
    "danger": "Tag--Danger",
    "warning": "Tag--Warning",
};

const Tag = ({color, size, className, children, ...props}) => {
    return (
        <div className={classNames(
            "Tag",
            tagColorClassMap[color],
            tagSizeClassMap[size],
            className,
        )} {...props}>
            {children}
        </div>
    )
};

Tag.propTypes = {
    color: PropTypes.oneOf(Object.keys(tagColorClassMap)),
    size: PropTypes.string,
};

export default Tag;
