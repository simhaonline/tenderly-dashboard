import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {Toggle} from "../../Elements";

const ContractListeningColumn = ({contract, value, onToggle}) => {
    return (
        <div className="DisplayFlex AlignItemsCenter">
            <span className="MarginRight2">{value ? 'Enabled' : 'Disabled'}</span>
            <Toggle value={value} onChange={event => {event.stopPropagation(); onToggle(contract, event)}}/>
        </div>
    )
};

ContractListeningColumn.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default ContractListeningColumn;
