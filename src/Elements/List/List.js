import React from 'react';
import classNames from 'classnames';

import './List.scss';

const List = ({children, clickable ,className}) => {
    return (
        <div className={classNames(
            "List",
            className,
            {
                "List--Clickable": clickable,
            },
        )}>
            {children}
        </div>
    )
};

export default List;
