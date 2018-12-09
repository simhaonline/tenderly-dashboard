import React, {Component, Fragment} from 'react';

import {Button, Icon} from "../../Elements";

class ProgressiveButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            finished: false,
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

        await onClick();

        this.setState({
            inProgress: false,
            finished: true,
        });

        const timeout = setTimeout(() => {
            this.setState({
                inProgress: false,
                finished: false,
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
            progressIcon,
            progressLabel,
            finishedIcon,
            finishedLabel,
        } = this.props;
        const {inProgress, finished} = this.state;

        return (
            <Button size={size} color={color} outline={outline} disabled={inProgress} onClick={this.handleButtonClick}>
                {!inProgress && !finished && <Fragment>
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
            </Button>
        );
    }
}

ProgressiveButton.defaultProps = {
    size: 'default',
    color: 'secondary',
    outline: false,
    icon: '',
    label: '',
    progressIcon: '',
    progressLabel: '',
    finishedIcon: 'check',
    finishedLabel: 'Done',
    resetTimeout: 3000,
    onClick: async () => {},
};

export default ProgressiveButton;
