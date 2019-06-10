import React from 'react';
import PropTypes from 'prop-types';

import {Card} from "../../Elements";

const TransactionHeader = ({transaction, contract}) => {
    console.log(contract);
    return (
        <Card className="TransactionInfoSidebar">

        </Card>
    )
};

TransactionHeader.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionHeader;
