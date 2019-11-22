import React from 'react';

import {Card, CardsWrapper, Icon} from "../../Elements";

import './AddWalletMethodPicker.scss';

const AddWalletMethods = [
    {
        slug: 'address',
        icon: 'inbox',
        title: 'Address',
    },
    {
        slug: 'csv',
        icon: 'list',
        title: 'CSV',
    },
];

const AddWalletMethodPicker = ({onSelect, currentActive}) => {
    return (
        <CardsWrapper horizontal className="MarginBottom4 AddWalletMethodPicker">
            {AddWalletMethods.map(method => <Card key={method.slug} className="AddWalletMethodPicker__Method" selectable onClick={() => onSelect(method.slug)} selected={currentActive === method.slug}>
                <Icon icon={method.icon} className="AddWalletMethodPicker__Method__Icon"/>
                <div className="AddWalletMethodPicker__Method__Title">{method.title}</div>
            </Card>)}
        </CardsWrapper>
    );
};

export default AddWalletMethodPicker;
