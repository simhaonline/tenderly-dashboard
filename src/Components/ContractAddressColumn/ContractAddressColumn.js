import React from 'react';
import PropTypes from 'prop-types';

import './ContractAddressColumn.scss';

const ContractAddressColumn = ({address}) => {
    return (
        <div className="ContractAddressColumn">
            {address}
        </div>
    )
};

ContractAddressColumn.propTypes = {
    address: PropTypes.string.isRequired,
};

export default ContractAddressColumn;
