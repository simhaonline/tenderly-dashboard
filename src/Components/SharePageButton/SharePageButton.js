import React from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Notifications from "../../Utils/Notifications";

import {Icon, Button} from "../../Elements";

const SharePageButton = ({url, onCopyMessage}) => {
    const link = url ? url : window.location.href;

    return (
        <CopyToClipboard text={link} onCopy={() => Notifications.success({
            title: onCopyMessage,
            icon: "clipboard",
        })}>
            <Button className="SharePageButton" size="small" outline color="secondary">
                <Icon icon="share-2"/>
                <span className="HideMobile">Share</span>
            </Button>
        </CopyToClipboard>
    )
};

SharePageButton.propTypes = {
    url: PropTypes.string,
    onCopyMessage: PropTypes.string,
};

SharePageButton.defaultProps = {
    onCopyMessage: "Copied link to clipboard",
};

export default SharePageButton;
