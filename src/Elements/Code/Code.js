import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Notifications from "../../Utils/Notifications";

import Icon from "../Icon/Icon";

import './Code.scss';

class Code extends PureComponent {
    render() {
        const {children, copy, copySuccessDescription, copySuccessTitle} = this.props;

        if (copy) {
            return (
                <CopyToClipboard text={copy} onCopy={() => Notifications.success({
                    title: copySuccessTitle,
                    description: copySuccessDescription,
                    icon: "clipboard",
                })}>
                    <code className="Code Code--Copyable">
                        {children}
                        <div className="Code__CopyLabel">
                            <Icon icon="clipboard"/>
                            <span className="MarginLeft1">Copy</span>
                        </div>
                    </code>
                </CopyToClipboard>
            )
        }

        return (
            <code className="Code">
                {children}
            </code>
        );
    }
}

Code.propTypes = {
    copy: PropTypes.string,
    copySuccessTitle: PropTypes.string,
    copySuccessDescription: PropTypes.string,
};

Code.defaultProps = {
    copySuccessTitle: "Copied code to clipboard.",
};

export default Code;
