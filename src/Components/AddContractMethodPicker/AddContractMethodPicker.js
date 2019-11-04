import React from 'react';

import {Card, CardsWrapper, Icon} from "../../Elements";

import './AddContractMethodPicker.scss';

const AddContractMethods = [
    {
        slug: 'verified',
        icon: 'compass',
        title: 'Import Verified',
    },
    {
        slug: 'cli',
        icon: 'terminal',
        title: 'CLI Upload',
    },
];

const AddContractMethodPicker = ({onSelect, currentActive}) => {
    return (
        <CardsWrapper horizontal className="MarginBottom4 AddContractMethodPicker">
            {AddContractMethods.map(method => <Card key={method.slug} className="AddContractMethodPicker__Method" selectable onClick={() => onSelect(method.slug)} selected={currentActive === method.slug}>
                <Icon icon={method.icon} className="AddContractMethodPicker__Method__Icon"/>
                <div className="AddContractMethodPicker__Method__Title">{method.title}</div>
            </Card>)}
        </CardsWrapper>
    );
};

export default AddContractMethodPicker;
