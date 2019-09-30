import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import * as _ from "lodash";

import {StateDiff} from "../../Core/models";

import {Icon, Tag} from "../../Elements";

/**
 * @param {StateDiff} stateDiff
 * @returns {*}
 * @constructor
 */
class ParsedStateDiff extends PureComponent {
    constructor(props) {
        super(props);

        const {stateDiff} = props;

        const isPrimitive = !_.isArray(stateDiff) && !_.isObject(stateDiff.before);

        this.state = {
            isPrimitive,
        };
    }

    render() {
        const {isPrimitive} = this.state;
        const {stateDiff} = this.props;

        console.log(stateDiff, isPrimitive);

        return (
            <div className="MarginBottom1">
                <div className="DisplayFlex">
                    <div className="MonospaceFont">
                        {!!stateDiff.type && <Tag color="primary-outline" size="small">{stateDiff.type}</Tag>}
                        <span className="MarginLeft1 SemiBoldText">{stateDiff.name}</span>
                    </div>
                    {isPrimitive && <div className="MonospaceFont MarginLeft4">
                        <span className="MarginRight1 TransactionStateDiff__Before">{String(stateDiff.before)}</span>
                        <Icon icon="arrow-right"/>
                        <span className="MarginLeft1 TransactionStateDiff__After">{String(stateDiff.after)}</span>
                    </div>}
                </div>
                {!isPrimitive && _.isObject(stateDiff.before) && Object.keys(stateDiff.before).map(objectKey => <div key={objectKey} className="MarginTop1 PaddingLeft2 DisplayFlex">
                    <div className="MonospaceFont">
                        <span className="MutedText">{objectKey}</span>
                    </div>
                    <div className="MonospaceFont MarginLeft4">
                        <span className="MarginRight1 TransactionStateDiff__Before">{String(stateDiff.before[objectKey])}</span>
                        <Icon icon="arrow-right"/>
                        <span className="MarginLeft1 TransactionStateDiff__After">{String(stateDiff.after[objectKey])}</span>
                    </div>
                </div>)}
            </div>
        );
    }
}

ParsedStateDiff.propTypes = {
    stateDiff: PropTypes.instanceOf(StateDiff).isRequired,
};

export default ParsedStateDiff;
