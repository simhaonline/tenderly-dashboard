import React from 'react';

import {Card, CardsWrapper, Icon} from "../../Elements";

import './AddContractMethodPicker.scss';

const AddContractMethods = [
    {
        slug: 'verified',
        icon: 'compass',
        title: 'Verified Contracts',
    },
    {
        slug: 'cli',
        icon: 'terminal',
        title: 'CLI Upload',
    },
];

const AddContractMethodPicker = ({onSelect, currentActive}) => {
    return (
        <CardsWrapper horizontal className="MarginBottom4">
            {AddContractMethods.map(method => <Card key={method.slug} className="Upload" selectable onClick={() => onSelect(method.slug)} selected={currentActive === method.slug}>
                <Icon icon={method.icon}/>
                <div>{method.title}</div>
            </Card>)}
        </CardsWrapper>
    );
};

export default AddContractMethodPicker;
