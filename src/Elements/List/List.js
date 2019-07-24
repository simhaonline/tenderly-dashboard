import React from 'react';
import classNames from 'classnames';

import './List.scss';

const List = ({children, clickable}) => {
    return (
        <div className={classNames(
            "List",
            {
                "List--Clickable": clickable,
            },
        )}>
            {children}
        </div>
    )
};

export default List;
