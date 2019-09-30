import React, {PureComponent, useState} from 'react';
import PropTypes from "prop-types";
import * as _ from "lodash";
import classNames from 'classnames';

import {StateDiff} from "../../Core/models";

import {Icon, Tag} from "../../Elements";

const ObjectPreview = ({propertyName, before, after}) => {
    const [open, setOpen] = useState(false);

    const isObject = _.isObject(before) && _.isObject(after);

    const isSameValue = !isObject && before === after;

    return (
        <div className="MarginTop2 PaddingLeft4">
            <div className={classNames(
                "DisplayFlex AlignItemsCenter",
                {
                    "CursorPointer": isObject,
                },
            )} onClick={() => {
                if (!isObject) return;

                setOpen(!open);
            }}>
                {isObject && <div className="MarginRight2">
                    <Icon icon={open ? 'minus-square' : 'plus-square'}/>
                </div>}
                <div className="MonospaceFont">
                    <span className="MutedText">{propertyName}</span>
                </div>
                {!isObject && !isSameValue && <div className="MonospaceFont MarginLeft4">
                    <span className="MarginRight1 TransactionStateDiff__Before">{String(before)}</span>
                    <Icon icon="arrow-right"/>
                    <span className="MarginLeft1 TransactionStateDiff__After">{String(after)}</span>
                </div>}
                {!isObject && isSameValue && <div className="MonospaceFont MarginLeft4">
                    <span className="MarginRight1 TransactionStateDiff__NoChange">{String(before)}</span>
                </div>}
            </div>
            {isObject && open && _.uniq([
                ...Object.keys(before),
                ...Object.keys(after),
            ]).map(objectKey => <ObjectPreview key={objectKey} propertyName={objectKey} before={before[objectKey]} after={after[objectKey]}/>)}
        </div>
    )
};

/**
 * @param {StateDiff} stateDiff
 * @returns {*}
 * @constructor
 */
class ParsedStateDiff extends PureComponent {
    constructor(props) {
        super(props);

        const {stateDiff} = props;

        const isPrimitive = !_.isObject(stateDiff.before);

        this.state = {
            isPrimitive,
        };
    }

    render() {
        const {isPrimitive} = this.state;
        const {stateDiff} = this.props;

        return (
            <div className="MarginBottom2">
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
                {!isPrimitive && _.isObject(stateDiff.before) && _.uniq([
                    ...Object.keys(stateDiff.before),
                    ...Object.keys(stateDiff.after),
                ]).map(objectKey => <ObjectPreview key={objectKey} propertyName={objectKey} before={stateDiff.before[objectKey]} after={stateDiff.after[objectKey]}/>)}
            </div>
        );
    }
}

ParsedStateDiff.propTypes = {
    stateDiff: PropTypes.instanceOf(StateDiff).isRequired,
};

export default ParsedStateDiff;
