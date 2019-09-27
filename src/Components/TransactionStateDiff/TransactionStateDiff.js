import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Blockies from "react-blockies";

import {Contract, StateDiff} from "../../Core/models";

import {Icon, Card, Tag, LinkButton} from "../../Elements";
import {EmptyState} from "../index";

import './TransactionStateDiff.scss';

class ContractStateDiffs extends PureComponent {
    constructor(props) {
        super(props);

        const {stateDiffs} = props;

        this.state = {
            parsedDiffs: stateDiffs.filter(diff => diff.parsed),
            rawDiffs: stateDiffs.filter(diff => !diff.parsed),
            viewRaw: false,
        };
    }

    toggleRawView = () => {
        this.setState({
            viewRaw: !this.state.viewRaw,
        });
    };

    render() {
        const {contract, address} = this.props;
        const {viewRaw, parsedDiffs, rawDiffs} = this.state;

        return (
            <Card color="dark">
                <div className="MarginBottom3 DisplayFlex AlignItemsCenter">
                    <Blockies
                        seed={contract ? contract.getUniqueId() : address}
                        size={8}
                        scale={4.5}
                        className="ContractPickerList__Item__Blockie"
                    />
                    <div>
                        {!!contract && <h3>{contract.name}</h3>}
                        <span className="LinkText MonospaceFont">{address}</span>
                    </div>
                </div>
                {parsedDiffs.map((stateDiff, index) => <div key={index} className="DisplayFlex MarginBottom1">
                    <div className="MonospaceFont">
                        {!!stateDiff.type && <Tag color="primary-outline" size="small">{stateDiff.type}</Tag>}
                        <span className="MarginLeft1 SemiBoldText">{stateDiff.name}</span>
                    </div>
                    <div className="MonospaceFont MarginLeft4">
                        <span className="MarginRight1 TransactionStateDiff__Before">{String(stateDiff.before)}</span>
                        <Icon icon="arrow-right"/>
                        <span className="MarginLeft1 TransactionStateDiff__After">{String(stateDiff.after)}</span>
                    </div>
                </div>)}
                {!!rawDiffs && rawDiffs.length > 0 && <div className="MarginBottom1">
                    <LinkButton onClick={this.toggleRawView}>
                        <Icon icon={viewRaw ? 'chevron-up' : "chevron-down"}/>
                        <span> {viewRaw ? "Hide" : "Show"} raw state changes</span>
                    </LinkButton>
                </div>}
                {viewRaw && rawDiffs.map((stateDiff, index) => <div key={index} className="MarginTop2 MarginBottom2">
                    <div className="MarginBottom1">
                        <span className="MarginBottom1 SemiBoldText">Key: </span>
                        <span className="MonospaceFont LinkText">{stateDiff.id}</span>
                    </div>
                    <div className="MonospaceFont MarginLeft4">
                        <div className="MarginBottom1"><span className="MutedText">Before:</span> {stateDiff.rawBefore}</div>
                        <div><span className="MutedText">After:</span> {stateDiff.rawAfter}</div>
                    </div>
                </div>)}
            </Card>
        )
    }
}

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
                {hasStateDiffs && Object.keys(groupedStateDiffs).sort((a, b) => {
                    return groupedStateDiffs[b].filter(diff => diff.parsed).length - groupedStateDiffs[a].filter(diff => diff.parsed).length;
                }).map(contract => <ContractStateDiffs key={contract} address={contract} contract={contracts[contract]} stateDiffs={groupedStateDiffs[contract]}/>)}
            </div>
        );
    }
}

TransactionStateDiff.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
};

export default TransactionStateDiff;
