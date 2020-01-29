import React from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Contract} from "../../Core/models";

import {Icon} from "../../Elements";

const PrettyAddressColumn = ({address, network, contracts, leftOffset, rightOffset}) => {
    const associatedContract = contracts.find(c => c.address === address && c.network === network);

    if (!!associatedContract) {
        return <div className="PrettyAddressColumn">
            <Icon icon="file-text" className="MarginRight1 LinkText"/>
            <span className="LinkText MonospaceFont">{associatedContract.name}</span>
        </div>
    }

    return (
        <div className="PrettyAddressColumn">
            <div className="LinkText MonospaceFont">{generateShortAddress(address, leftOffset, rightOffset)}</div>
        </div>
    )
};

PrettyAddressColumn.propTypes = {
    address: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    aliases: PropTypes.arrayOf(PropTypes.object),
    leftOffset: PropTypes.number,
    rightOffset: PropTypes.number,
};

PrettyAddressColumn.defaultProps = {
    leftOffset: 12,
    rightOffset: 4,
};

export default PrettyAddressColumn;
