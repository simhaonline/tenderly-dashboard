import React from 'react';
import PropTypes from 'prop-types';

import {Card} from "../../Elements";

const TransactionInfoSidebar = ({transaction, contract}) => {
    console.log(contract);
    return (
        <Card className="TransactionInfoSidebar">

        </Card>
    )
};

TransactionInfoSidebar.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionInfoSidebar;
