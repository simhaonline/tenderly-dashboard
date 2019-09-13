import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";

import {Contract, StateDiff} from "../../Core/models";

import {Icon, Card, Tag} from "../../Elements";
import {EmptyState} from "../index";

import './TransactionStateDiff.scss';

class TransactionStateDiff extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            contracts: props.contracts.reduce((map, contract) => {
                map[contract.address] = contract;

                return map;
            }, {}),
        };
    }

    render() {
        const {stateDiffs} = this.props;
        const {contracts} = this.state;

        const groupedStateDiffs = _.groupBy(stateDiffs, 'contract');

        const hasStateDiffs = !!stateDiffs && stateDiffs.length > 0;

        return (
            <div className="TransactionStateDiff">
                {!hasStateDiffs && <div>
                    <EmptyState title="No changes" description="It seems that no state variables were changed in this transaction." icon="code"/>
                </div>}
                {hasStateDiffs && Object.keys(groupedStateDiffs).map(contract => <Card color="dark" key={contract}>
                    <div className="MarginBottom3">
                        {!!contracts[contract] && <h3>{contracts[contract].name}</h3>} <span className="LinkText MonospaceFont">{contract}</span>
                    </div>
                    {groupedStateDiffs[contract].map((stateDiff, index) => <div key={index} className="DisplayFlex MarginBottom1">
                        <div className="MonospaceFont">
                            {!!stateDiff.type && <Tag color="primary-outline" size="small">{stateDiff.type}</Tag>}
                            <span className="MarginLeft1 SemiBoldText">{stateDiff.name}</span>
                        </div>
                        <div className="MonospaceFont MarginLeft4">
                            <span className="MarginRight1 TransactionStateDiff__Before">{stateDiff.before}</span>
                            <Icon icon="arrow-right"/>
                            <span className="MarginLeft1 TransactionStateDiff__After">{stateDiff.after}</span>
                        </div>
                    </div>)}
                </Card>)}
            </div>
        );
    }
}

TransactionStateDiff.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
};

export default TransactionStateDiff;
