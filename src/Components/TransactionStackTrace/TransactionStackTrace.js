import React from 'react';
import PropTypes from 'prop-types';

import {StackTrace} from "../../Core/models";

const TransactionStackTrace = ({stackTrace}) => {
    return (
        <div className="TransactionStackTrace">
            Stack Trace
        </div>
    );
};

TransactionStackTrace.propTypes = {
    stackTrace: PropTypes.instanceOf(StackTrace).isRequired,
};

export default TransactionStackTrace;
