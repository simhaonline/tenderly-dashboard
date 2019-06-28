import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../../Elements";

import './CodePreview.scss';

const codeLineSize = 1.375;

class CodePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offsetTop: 0,
            offsetBottom: 0,
        };
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

    render() {
        const {file, line, linePreview, isExpandable} = this.props;
        const {offsetTop, offsetBottom} = this.state;

        const lineNumbers = [];
        const wrapperStyle = {};

        if (line && linePreview) {
            const topLinesDisplayed = line - linePreview - offsetTop;
            for (let i = topLinesDisplayed; i <= (line + linePreview + offsetBottom); i++) {
                lineNumbers.push({number: i, active: i === line});
            }

            wrapperStyle.height = `${lineNumbers.length * codeLineSize}rem`;
        } else {
            const textLinesCount = file.source.split("\n").length;

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
            )} >
                {isExpandable && <div className="ExpandingWrapper" onClick={this.handleExpandUp}>
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
                {isExpandable && <div className="ExpandingWrapper" onClick={this.handleExpandDown}>
                    <div className="ExpandingControl">
                        <span>Expand</span>
                        <Icon icon="chevrons-down" className="MarginLeft1"/>
                    </div>
                </div>}
            </div>
        )
    }
}

CodePreview.propTypes = {
    line: PropTypes.number,
    linePreview: PropTypes.number,
    file: PropTypes.object.isRequired,
    isExpandable: PropTypes.bool,
};

export default CodePreview;
