import React, {Component, Fragment} from 'react';

import {Button, Icon} from "../../Elements";

class ProgressiveButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            finished: false,
            error: false,
            timeout: null,
        }
    }

    handleButtonClick = async () => {
        const {resetTimeout, onClick} = this.props;
        const {finished} = this.state;

        if (finished) {
            return;
        }

        this.setState({
            inProgress: true,
        });

        const successfulAction = await onClick();

        this.setState({
            inProgress: false,
            finished: !!successfulAction,
            error: !successfulAction,
        });

        const timeout = setTimeout(() => {
            this.setState({
                inProgress: false,
                finished: false,
                error: false,
            });
        }, resetTimeout);

        this.setState({
            timeout,
        });
    };

    componentWillUnmount() {
        const {timeout} = this.state;

        if (timeout) {
            clearTimeout(timeout);
        }
    }

    render() {
        const {
            size,
            color,
            outline,
            icon,
            label,
            disabled,
            progressIcon,
            progressLabel,
            finishedIcon,
            finishedLabel,
            errorIcon,
            errorLabel,
        } = this.props;
        const {inProgress, finished, error} = this.state;

        return (
            <Button size={size} color={color} outline={outline} disabled={inProgress || disabled} onClick={this.handleButtonClick}>
                {!inProgress && !finished && !error && <Fragment>
                    {!!icon && <Icon icon={icon}/>}
                    {!!label && <span>{label}</span>}
                </Fragment>}
                {inProgress && <Fragment>
                    {(!!progressIcon || !!icon) && <Icon icon={progressIcon || icon}/>}
                    {(!!progressLabel || !!label) && <span>{progressLabel || label}</span>}
                </Fragment>}
                {finished && <Fragment>
                    {!!finishedIcon && <Icon icon={finishedIcon}/>}
                    {!!finishedLabel && <span>{finishedLabel}</span>}
                </Fragment>}
                {error && <Fragment>
                    {!!errorIcon && <Icon icon={errorIcon}/>}
                    {!!errorLabel && <span>{errorLabel}</span>}
                </Fragment>}
            </Button>
        );
    }
}

ProgressiveButton.defaultProps = {
    size: null,
    color: 'secondary',
    outline: false,
    icon: '',
    label: '',
    disabled: false,
    progressIcon: '',
    progressLabel: '',
    finishedIcon: 'check',
    finishedLabel: 'Done',
    errorIcon: 'x',
    errorLabel: 'Whoops',
    resetTimeout: 2000,
    onClick: async () => {},
};

export default ProgressiveButton;
