import React from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Notifications from "../../Utils/Notifications";

import {Icon} from "../../Elements";

import './CopyableText.scss';

const CopyableText = ({text, onSuccessMessage}) => {
    return (
        <CopyToClipboard text={text} onCopy={() => onSuccessMessage && Notifications.success({
            title: onSuccessMessage,
            icon: "clipboard",
        })}>
            <div className="CopyableText DisplayFlex">
                <div className="CopyableText_Icon">
                    <Icon icon="copy"/>
                </div>
                <span className="CopyableText_Value">{text}</span>
            </div>
        </CopyToClipboard>
    )
};

CopyableText.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onSuccessMessage: PropTypes.string,
};

export default CopyableText;
