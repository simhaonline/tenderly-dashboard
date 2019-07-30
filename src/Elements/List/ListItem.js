import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";

const ListItem = ({children, active, to, className}) => {
    let ListItemTag = 'div';

    if (to) {
        ListItemTag = Link;
    }

    return (
        <ListItemTag className={classNames(
            "List__Item",
            className,
            {
                "List__Item--Active": active,
            }
        )} to={to}>
            {children}
        </ListItemTag>
    )
};

export default ListItem;
