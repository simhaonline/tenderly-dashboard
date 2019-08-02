import React from 'react';
import classNames from 'classnames';

import {PageLink} from "../../Components";

const ListItem = ({children, active, selectable, to, onClick, className}) => {
    let ListItemTag = 'div';

    if (to) {
        ListItemTag = PageLink;
    }

    return (
        <ListItemTag className={classNames(
            "List__Item",
            className,
            {
                "List__Item--Active": active,
                "List__Item--Selectable": selectable,
            }
        )} to={to} onClick={onClick}>
            {children}
        </ListItemTag>
    )
};

export default ListItem;
