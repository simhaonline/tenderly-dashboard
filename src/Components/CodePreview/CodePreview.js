import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon, Button} from "../../Elements";

import './CodePreview.scss';

const codeLineSize = 1.375;

class CodePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offsetTop: 0,
            offsetBottom: 0,
            centerLine: props.line,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {line} = this.props;

        if (line !== prevProps.line) {
            this.setState({
                centerLine: line,
            });
        }
    }

    handleExpandUp = () => {
        this.setState({
            offsetTop: this.state.offsetTop + 10,
        });
    };

    handleExpandDown = () => {
        this.setState({
            offsetBottom: this.state.offsetBottom + 10,
        });
    };

    handleWheelScroll = (event) => {
        const {scrollEnabled} = this.props;

        if (!scrollEnabled) {
            return;
        }

        if (event.deltaY > 0) {
            this.setState({
                centerLine: this.state.centerLine + 1,
            });
        } else {
            this.setState({
                centerLine: this.state.centerLine - 1,
            });
        }
    };

    resetScroll = () => {
        const {line} = this.props;

        this.setState({
            centerLine: line,
        });
    };

    render() {
        const {file, line, linePreview, isExpandable, minHeight, scrollEnabled} = this.props;
        const {offsetTop, offsetBottom, centerLine} = this.state;

        const lineNumbers = [];
        const wrapperStyle = {};

        const textLinesCount = Object.keys(file.sourceCompiledMap).length;

        let isSelectedLineHidden;

        if (line) {
            const currentLineOffset = line - centerLine;

            isSelectedLineHidden = -1*currentLineOffset > linePreview + offsetTop || currentLineOffset > linePreview + offsetBottom;
        }

        if (line && linePreview) {
            const topLinesDisplayed = Math.max(0, centerLine - linePreview - offsetTop);
            const bottomLinesDisplay = Math.min(textLinesCount, centerLine + linePreview + offsetBottom);

            for (let i = topLinesDisplayed; i <= bottomLinesDisplay; i++) {
                lineNumbers.push({number: i, active: i === line});
            }

            wrapperStyle.height = `${lineNumbers.length * codeLineSize}rem`;
        } else {
            for (let i = 1; i <= textLinesCount; i++) {
                lineNumbers.push({number: i, active: i === line});
            }
        }

        return (
            <div className={classNames(
                "CodeWrapper",
                {
                    FullPreview: !linePreview,
                }
            )} style={{
                minHeight,
            }} onWheel={this.handleWheelScroll}>
                {isExpandable && lineNumbers[0].number !== 0 && <div className="ExpandingWrapper" onClick={this.handleExpandUp}>
                    <div className="ExpandingControl">
                        <span>Expand</span>
                        <Icon icon="chevrons-up" className="MarginLeft1"/>
                    </div>
                </div>}
                <div className="CodeContent" style={wrapperStyle}>
                    <div className="StackLines">
                        {lineNumbers.map(num =>
                            <div key={num.number} id={`line-${num.number}`} className={`StackLine ${num.active? 'active': ''}`}>{num.number}</div>
                        )}
                    </div>
                    <pre className="StackCode">
                        {lineNumbers.map(num =>
                            <div key={num.number} id={`line-${num.number}`} dangerouslySetInnerHTML={{__html: file.sourceCompiledMap[num.number]}}/>
                        )}
                    </pre>
                </div>
                {isExpandable && lineNumbers[lineNumbers.length - 1].number !== textLinesCount && <div className="ExpandingWrapper" onClick={this.handleExpandDown}>
                    <div className="ExpandingControl">
                        <span>Expand</span>
                        <Icon icon="chevrons-down" className="MarginLeft1"/>
                    </div>
                </div>}
                {scrollEnabled && isSelectedLineHidden && !!line && <Button color="secondary" className="ResetPositionButton" size="small" outline onClick={this.resetScroll}>
                    <span>Back to highlighted line</span>
                </Button>}
            </div>
        )
    }
}

CodePreview.propTypes = {
    line: PropTypes.number,
    linePreview: PropTypes.number,
    file: PropTypes.object.isRequired,
    scrollEnabled: PropTypes.bool,
    isExpandable: PropTypes.bool,
};

export default CodePreview;
