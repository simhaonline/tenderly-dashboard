import React from 'react';
import classNames from 'classnames';

const ListItem = ({children, active}) => {
    return (
        <div className={classNames(
            "List__Item",
            {
                "List__Item--Active": active,
            }
        )}>
            {children}
        </div>
    )
};

export default ListItem;
