import React from 'react';
import PropTypes from 'prop-types';

import {Wallet} from "../../Core/models";

import {Panel, PanelContent} from "../../Elements";

const WalletGeneralInfo = ({wallet}) => {
    return (
        <Panel>
            <PanelContent>
                Wallet General Info
            </PanelContent>
        </Panel>
    );
};

WalletGeneralInfo.propTypes = {
    wallet: PropTypes.instanceOf(Wallet).isRequired,
};

export default WalletGeneralInfo;
