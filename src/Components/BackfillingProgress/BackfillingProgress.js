import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Alert, ProgressBar} from "../../Elements";

class BackfillingProgress extends PureComponent {
    render() {
        const {status, context} = this.props;

        console.log(status, context);

        const percentage = status.completed / status.total * 100;

        return (
            <Alert color="info" animation>
                <div className="Padding1">
                    <div>
                        <h3 className="MarginBottom1">Backfill in Progress!</h3>
                        <p className="MutedText">We are currently backfilling the last 1000 transactions for every contract in this project.</p>
                    </div>
                    <div className="MarginBottom2">
                        <span className="MarginRight1">Current Progress:</span>
                        <span className="SemiBoldText">{status.completed} / {status.total}</span> <span className="MutedText">({_.round(percentage, 2)}%)</span>
                    </div>
                    <ProgressBar displayPercentage value={percentage}/>
                </div>
            </Alert>
        );
    }
}

BackfillingProgress.propTypes = {
    status: PropTypes.object.isRequired,
    context: PropTypes.oneOf(["contract", "project"]),
};

export default BackfillingProgress;
