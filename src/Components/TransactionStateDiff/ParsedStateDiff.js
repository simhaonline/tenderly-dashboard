import React, {PureComponent, useState} from 'react';
import PropTypes from "prop-types";
import * as _ from "lodash";
import classNames from 'classnames';

import {StateDiff} from "../../Core/models";

import {Icon, Tag} from "../../Elements";
import {CopyableText} from "../index";

const StateDiffDisplayValueTypeClassMap = {
    before: "TransactionStateDiff__Value--Before",
    after: "TransactionStateDiff__Value--After",
    same: "TransactionStateDiff__Value--Same",
};

const StateDiffDisplayValue = ({value, type, className}) => {
    const parsedValue = String(value);
    const isLongValue = parsedValue.length > 21;

    return <CopyableText text={parsedValue} position={type === 'before' ? "left" : "right"} render={() => <div className={classNames(
        "TransactionStateDiff__Value",
        className,
        StateDiffDisplayValueTypeClassMap[type],
        {
            "TransactionStateDiff__Value--LongText": isLongValue,
        },
    )}>
        {parsedValue}
    </div>}/>
};

StateDiffDisplayValue.propTypes = {
    value: PropTypes.any,
    className: PropTypes.string,
    type: PropTypes.oneOf(['before', 'after', 'same']).isRequired,
};

const ObjectPreview = ({propertyName, before, after}) => {
    const [open, setOpen] = useState(false);

    const isObject = _.isObject(before) || _.isObject(after);

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
                {!isObject && !isSameValue && <div className="MarginLeft2 DisplayFlex AlignItemsCenter">
                    {!!before && <StateDiffDisplayValue value={before} type="before" className="MarginRight1"/>}
                    {!!before && <Icon icon="arrow-right" className="MarginRight1"/>}
                    <StateDiffDisplayValue value={after} type="after"/>
                </div>}
                {!isObject && isSameValue && <div className="MonospaceFont MarginLeft2">
                    <StateDiffDisplayValue value={before} type="same"/>
                </div>}
            </div>
            {isObject && open && _.uniq([
                ...Object.keys(before || {}),
                ...Object.keys(after ||  {}),
            ]).map(objectKey => {
                const beforeObject = before || {};
                const afterObject = after || {};

                return <ObjectPreview key={objectKey} propertyName={objectKey}
                                      before={beforeObject[objectKey]} after={afterObject[objectKey]}/>;
            })}
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

        const isPrimitive = !_.isObject(stateDiff.before) && !_.isObject(stateDiff.after);

        this.state = {
            isPrimitive,
        };
    }

    render() {
        const {isPrimitive} = this.state;
        const {stateDiff} = this.props;

        const isSameValue = isPrimitive && stateDiff.before === stateDiff.after;

        return (
            <div className="MarginBottom2">
                <div className="DisplayFlex">
                    <div className="MonospaceFont">
                        {!!stateDiff.type && <Tag color="primary-outline" size="small">{stateDiff.type}</Tag>}
                        <span className="MarginLeft1 SemiBoldText">{stateDiff.name}</span>
                    </div>
                    {isPrimitive && !isSameValue && <div className="MarginLeft2 DisplayFlex AlignItemsCenter">
                        {!!stateDiff.before && <StateDiffDisplayValue type="before" className="MarginRight1" value={stateDiff.before}/>}
                        {!!stateDiff.before && <Icon icon="arrow-right" className="MarginRight1"/>}
                        <StateDiffDisplayValue type="after" value={stateDiff.after}/>
                    </div>}
                    {isPrimitive && isSameValue && <div className="MonospaceFont MarginLeft2">
                        <StateDiffDisplayValue type="same" value={stateDiff.before}/>
                    </div>}
                </div>
                {!isPrimitive && _.uniq([
                    ...Object.keys(stateDiff.before || {}),
                    ...Object.keys(stateDiff.after || {}),
                ]).map(objectKey => {
                    const beforeObject = stateDiff.before || {};
                    const afterObject = stateDiff.after || {};

                    return <ObjectPreview key={objectKey} propertyName={objectKey} before={beforeObject[objectKey]} after={afterObject[objectKey]}/>;
                })}
            </div>
        );
    }
}

ParsedStateDiff.propTypes = {
    stateDiff: PropTypes.instanceOf(StateDiff).isRequired,
};

export default ParsedStateDiff;
