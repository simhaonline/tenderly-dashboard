import React from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Notifications from "../../Utils/Notifications";

import {Icon} from "../../Elements";

import './CopyableText.scss';

const CopyableText = ({text, render, onSuccessMessage, position}) => {
    const hasCustomRendering = !!render;

    return (
        <CopyToClipboard text={text} onCopy={() => onSuccessMessage && Notifications.success({
            title: onSuccessMessage,
            icon: "clipboard",
        })}>
            <div className="CopyableText DisplayInlineFlex">
                {position === "left" && <div className="CopyableText_Icon">
                    <Icon icon="copy"/>
                </div>}
                {!hasCustomRendering && <span className="CopyableText_Value">{text}</span>}
                {hasCustomRendering && render()}
                {position === "right" && <div className="CopyableText_Icon">
                    <Icon icon="copy"/>
                </div>}
            </div>
        </CopyToClipboard>
    )
};

CopyableText.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    render: PropTypes.func,
    onSuccessMessage: PropTypes.string,
    position: PropTypes.oneOf([
        "left",
        "right",
    ]),
};

CopyableText.defaultProps = {
    position: "left",
    onSuccessMessage: "Copied to clipboard",
};

export default CopyableText;
