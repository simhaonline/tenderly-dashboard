import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Notifications from "../../Utils/Notifications";

import {Icon, Button} from "../../Elements";

const SharePageButton = () => {
    return (
        <CopyToClipboard text={window.location.href} onCopy={() => Notifications.success({
            title: "Copied link to clipboard",
            icon: "clipboard",
        })}>
            <Button className="SharePageButton MarginLeft2" size="small" outline color="secondary">
                <Icon icon="share-2"/>
            </Button>
        </CopyToClipboard>
    )
};

export default SharePageButton;
