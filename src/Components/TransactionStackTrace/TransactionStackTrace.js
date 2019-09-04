import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from "lodash";

import {StackTrace} from "../../Core/models";

import {Panel, Icon, PanelContent, LinkButton} from "../../Elements";
import {CopyableText} from "..";

import './TransactionStackTrace.scss';

/**
 * @param {Trace} trace
 * @param {Contract[]} contracts
 * @param {boolean} first
 * @param {boolean} last
 * @param {Function} onContractSourceClick
 * @param {Function} onViewDebuggerClick
 * @constructor
 */
const TransactionStackTraceLine = ({trace, contracts, first, last, onContractSourceClick = () => {}, onViewDebuggerClick = () => {}}) => {
    const contract = contracts.find(contract => trace.contract === contract.address);
    let file;

    if (contract && trace.fileId !== null) {
        file = contract.getFileById(trace.fileId);
    }

    return (
        <div className={classNames(
            "TransactionStackTraceLine",
            {
                "TransactionStackTraceLine--Error": first,
            }
        )}>
            <div className="TransactionStackTraceLine__IconWrapper">
                {first && <Icon icon="alert-triangle" className="DangerText"/>}
                {last && <Icon icon="arrow-up-circle"/>}
                {!first && !last && <div className="TransactionStackTraceLine__Line"/>}
            </div>
            {!!file && !!trace.functionName && <div className="TransactionStackTraceLine__TraceInfo">
                {!first && <div>{trace.functionName.trim()}()</div>}
                {first && <div>{file.source.split('\n')[trace.lineNumber - 1].trim()}</div>}
                <div className="TransactionStackTraceLine__ContractInfo"><span className="MutedText">at</span> <LinkButton onClick={() => onContractSourceClick(trace)}>{contract.name}:{trace.lineNumber}</LinkButton></div>
            </div>}
            {(!file || !trace.functionName) && <div className="TransactionStackTraceLine__TraceInfo">
                <div>Opcode: [{trace.op}]</div>
                <div className="TransactionStackTraceLine__ContractInfo"><span className="MutedText">in</span> <CopyableText text={trace.contract} position="right"/></div>
            </div>}
            {first && <div>
                <LinkButton className="TransactionStackTraceLine__DebugButton" onClick={onViewDebuggerClick}>
                    <Icon icon="terminal"/>
                    <span className="MarginLeft1">Debug Error</span>
                </LinkButton>
            </div>}
        </div>
    )

};

class TransactionStackTrace extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    goToErrorInDebugger = () => {
        const {onNavigate} = this.props;

        onNavigate({
            tab: 'debugger',
            trace: 'last',
        });
    };

    goToContractSourceLine = (trace) => {
        const {onNavigate} = this.props;

        onNavigate({
            tab: 'contracts',
            trace: trace,
        });
    };

    render() {
        const {expanded} = this.state;
        const {stackTrace, contracts} = this.props;

        const topTraces = _.take(stackTrace.trace, 2);
        const middleTrace = _.drop(_.dropRight(stackTrace.trace, 2), 2);
        const bottomTraces = _.takeRight(stackTrace.trace, 2);

        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Stack Trace</h2>
                <Panel className="TransactionStackTrace">
                    <PanelContent>
                        {stackTrace.trace.length > 5 && <div className="TransactionStackTrace__Wrapper">
                            {topTraces.map((trace, index) =>
                                <TransactionStackTraceLine onContractSourceClick={this.goToContractSourceLine} onViewDebuggerClick={this.goToErrorInDebugger} trace={trace} contracts={contracts} key={index} first={index === 0}/>
                            )}
                            <div className={classNames(
                                "TransactionStackTraceLine",
                                "TransactionStackTraceLine--Collapse",
                                {
                                    "TransactionStackTraceLine--CollapseActive": expanded,
                                },
                            )} onClick={this.toggleExpand}>
                                <div className="TransactionStackTraceLine__IconWrapper">
                                    <Icon icon={expanded ? "minus-square" : "layers"} className="MutedText"/>
                                </div>
                                <div className="TransactionStackTraceLine__TraceInfo MutedText">
                                    <span className="SemiBoldText">{middleTrace.length} traces</span> from stack traces have been {expanded ? "expanded" : "collapsed"}
                                </div>
                                <div>
                                    <Icon icon={expanded ? "chevron-up" : "chevron-down"}/>
                                    <span className="MarginLeft1">{expanded ? "Collapse" : "Expand"}</span>
                                </div>
                            </div>
                            {expanded && middleTrace.map((trace, index) =>
                                <TransactionStackTraceLine onContractSourceClick={this.goToContractSourceLine} trace={trace} contracts={contracts} key={index}/>
                            )}
                            {bottomTraces.map((trace, index) =>
                                <TransactionStackTraceLine onContractSourceClick={this.goToContractSourceLine} trace={trace} contracts={contracts} key={index} last={index === (bottomTraces.length - 1)}/>
                            )}
                        </div>}
                        {stackTrace.trace.length <= 5 && <div className="TransactionStackTrace__Wrapper">
                            {stackTrace.trace.map((trace, index) =>
                                <TransactionStackTraceLine onContractSourceClick={this.goToContractSourceLine} onViewDebuggerClick={this.goToErrorInDebugger} trace={trace} contracts={contracts} key={index} first={index === 0} last={index === (stackTrace.trace.length - 1)}/>
                            )}
                        </div>}
                    </PanelContent>
                </Panel>
            </Fragment>
        );
    }
}

TransactionStackTrace.propTypes = {
    stackTrace: PropTypes.instanceOf(StackTrace).isRequired,
    onNavigate: PropTypes.func.isRequired,
};

export default TransactionStackTrace;
