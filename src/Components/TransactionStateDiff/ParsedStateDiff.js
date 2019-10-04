import React, {PureComponent, useState} from 'react';
import PropTypes from "prop-types";
import * as _ from "lodash";
import classNames from 'classnames';

import {StateDiff} from "../../Core/models";

import {Icon, Tag} from "../../Elements";

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
                {!isObject && !isSameValue && <div className="MonospaceFont MarginLeft4">
                    {!!before && <span className="MarginRight1 TransactionStateDiff__Before">{String(before)}</span>}
                    {!!before && <Icon icon="arrow-right" className="MarginRight1"/>}
                    <span className="TransactionStateDiff__After">{String(after)}</span>
                </div>}
                {!isObject && isSameValue && <div className="MonospaceFont MarginLeft4">
                    <span className="TransactionStateDiff__NoChange">{String(before)}</span>
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
                    {isPrimitive && !isSameValue && <div className="MonospaceFont MarginLeft4">
                        {!!stateDiff.before && <span className="MarginRight1 TransactionStateDiff__Before">{String(stateDiff.before)}</span>}
                        {!!stateDiff.before && <Icon icon="arrow-right" className="MarginRight1"/>}
                        <span className="TransactionStateDiff__After">{String(stateDiff.after)}</span>
                    </div>}
                    {isPrimitive && isSameValue && <div className="MonospaceFont MarginLeft4">
                        <span className="MarginRight1 TransactionStateDiff__NoChange">{String(stateDiff.before)}</span>
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
