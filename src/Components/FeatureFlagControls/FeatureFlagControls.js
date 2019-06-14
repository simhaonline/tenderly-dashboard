import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import {Icon, Toggle} from "../../Elements";
import * as featureFlagActions from '../../Core/FeatureFlag/FeatureFlag.actions';
import {FeatureFlagTypes} from "../../Common/constants";

import './FeatureFlagControls.scss';

class FeatureFlagControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            possibleFlags: Object.values(FeatureFlagTypes),
            open: false,
        }
    }

    toggleControlsOpen = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    closeControls = () => {
        if (this.state.open) {
            this.setState({
                open: false,
            });
        }
    };

    toggleFeatureFlag = (flag) => {
        const {actions} = this.props;

        actions.toggleFeatureFlag(flag.key, !flag.active);
    };

    render() {
        const {loggedIn, user, flags} = this.props;
        const {possibleFlags, open} = this.state;

        const isInternalUser = user.email && user.email.includes('@tenderly.app');

        if (!loggedIn || !isInternalUser) {
            return null;
        }

        const flagControls = possibleFlags.map(key => ({
            key,
            active: flags[key] || false,
            label: key,
        }));

        return (
            <OutsideClickHandler onOutsideClick={this.closeControls}>
                <div className="FeatureFlagControls">
                    <div className="FlagControlsToggle" onClick={this.toggleControlsOpen}>
                        <Icon icon="moon"/>
                    </div>
                    <div className={classNames(
                        "FlagControlsWrapper",
                        {
                            "Open": open,
                        }
                    )}>
                        {flagControls.map(flag => <div className="FlagControlWrapper" key={flag.key} onClick={() => this.toggleFeatureFlag(flag)}>
                            <div className="ControlLabel">
                                <span>{flag.label}</span>
                            </div>
                            <div className="ControlToggle">
                                <Toggle value={flag.active}/>
                            </div>
                        </div>)}
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        flags: state.featureFlag.flags,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(featureFlagActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FeatureFlagControls);
