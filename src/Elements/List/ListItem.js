import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";

const ListItem = ({children, active, to, onClick, className}) => {
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
        )} to={to} onClick={onClick}>
            {children}
        </ListItemTag>
    )
};

export default ListItem;
