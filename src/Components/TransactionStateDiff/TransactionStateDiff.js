import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Contract, StateDiff} from "../../Core/models";

import './TransactionStateDiff.scss';

class TransactionStateDiff extends PureComponent {
    render() {
        const {contracts, stateDiffs} = this.props;

        console.log(stateDiffs);

        return (
            <div className="TransactionStateDiff">
                statediff
            </div>
        );
    }
}

TransactionStateDiff.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
};

export default TransactionStateDiff;
