import React from 'react';
import classNames from 'classnames';

const ListItem = ({children, active, className}) => {
    return (
        <div className={classNames(
            "List__Item",
            className,
            {
                "List__Item--Active": active,
            }
        )}>
            {children}
        </div>
    )
};

export default ListItem;
