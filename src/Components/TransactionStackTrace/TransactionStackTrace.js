import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";

import {StackTrace} from "../../Core/models";

import {Panel, PanelContent, LinkButton} from "../../Elements";

import './TransactionStackTrace.scss';

/**
 * @param {Trace} trace
 * @param {Contract[]} contracts
 * @constructor
 */
const TransactionStackTraceLine = ({trace, contracts, first, last}) => {
    const contract = contracts.find(contract => trace.contract === contract.address);
    let file;

    if (contract && trace.fileId !== null) {
        file = contract.getFileById(trace.fileId);
    }

    return (
        <div className="TransactionStackTraceLine">
            {!!file && <div>
                {!first && <div>{trace.functionName.trim()}()</div>}
                {first && <div>{file.source.split('\n')[trace.lineNumber - 1].trim()}</div>}
                <div>at <LinkButton>{contract.name}:{trace.lineNumber}</LinkButton></div>
            </div>}
            {!file && <div>
                <div>Opcode: [{trace.op}]</div>
                <div>in <LinkButton>{trace.contract}</LinkButton></div>
            </div>}
        </div>
    )

};

class TransactionStackTrace extends PureComponent {
    render() {
        const {stackTrace, contracts} = this.props;

        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Stack Trace</h2>
                <Panel className="TransactionStackTrace">
                    <PanelContent>
                        <div className="TransactionStackTrace__Wrapper">
                            {stackTrace.trace.map((trace, index) =>
                                <TransactionStackTraceLine trace={trace} contracts={contracts} key={index} first={index === 0} last={index === (stackTrace.trace.length - 1)}/>
                            )}
                        </div>
                    </PanelContent>
                </Panel>
            </Fragment>
        );
    }
}

TransactionStackTrace.propTypes = {
    stackTrace: PropTypes.instanceOf(StackTrace).isRequired,
};

export default TransactionStackTrace;
