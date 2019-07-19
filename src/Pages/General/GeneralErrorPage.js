import React, {Component} from 'react';

import Intercom from "../../Utils/Intercom";

import LogoHorizontal from "../../Components/AppHeader/logo-horizontal.svg";

import {Button, Icon} from "../../Elements";

import './GeneralErrorPage.scss';

class GeneralErrorPage extends Component {
    openSupportDialog = () => {
        Intercom.openNewConversation();
    };

    handlePageReload = () => {
        window.location.reload();
    };

    render() {
        return (
            <div className="GeneralErrorPage">
                <div className="ErrorHeader">
                    <a href="/">
                        <img className="AppLogo" src={LogoHorizontal} alt="Tenderly Logo"/>
                    </a>
                </div>
                <div className="ErrorContent">
                    <div className="ErrorStripe">
                        <div className="ErrorCode">INVALID OPCODE: 111110100</div>
                        <p className="ErrorDescription">Whoops, seems that something has gone wrong on our end. The issue has been reported to our developers and we will work on resolving the issue as soon as possible.</p>
                        <p className="ErrorDescription">In the meantime you can try refreshing the page (the old "did you plug it in" trick) or contact our support to provide us more details.</p>
                        <div className="ErrorActions MarginBottom4">
                            <Button onClick={this.handlePageReload}>
                                <Icon icon="refresh-cw"/>
                                <span>Reload Page</span>
                            </Button>
                            <Button outline onClick={this.openSupportDialog}>
                                <Icon icon="message-square"/>
                                <span>Contract Support</span>
                            </Button>
                        </div>
                        <div>
                            <a href="/">Go to Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralErrorPage;
