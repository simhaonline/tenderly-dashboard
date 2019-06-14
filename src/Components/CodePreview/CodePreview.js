import React, {Component} from 'react';
import classNames from 'classnames';
import hljs from "highlight.js";
import hljsDefineSolidity from "highlightjs-solidity";

import './CodePreview.scss';

hljsDefineSolidity(hljs);
hljs.initHighlightingOnLoad();

class Code extends Component {
    state = {
        ref: React.createRef(),
    };

    componentDidMount() {
        hljs.highlightBlock(this.state.ref.current);
    }

    componentDidUpdate() {
        hljs.highlightBlock(this.state.ref.current);
    }

    render() {
        const {source, line, linePreview} = this.props;

        const lineNumbers = [];
        const wrapperStyle = {};
        const codeStyle = {};

        if (line && linePreview) {
            for (let i = line - linePreview; i <= line + linePreview; i++) {
                lineNumbers.push({number: i, active: i === line});
            }

            codeStyle.top = `${(line - linePreview - 1) * - 21}px`;
            wrapperStyle.height = `${lineNumbers.length * 21}px`;
        } else {
            const textLinesCount = source.split("\n").length;

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
            )} style={wrapperStyle}>
                <div className="StackLines">
                    {lineNumbers.map(num =>
                        <div key={num.number} id={`line-${num.number}`} className={`StackLine ${num.active? 'active': ''}`}>{num.number}</div>
                    )}
                </div>
                <pre className="StackCode" ref={this.state.ref} style={codeStyle}>
                    {source}
                </pre>
            </div>
        )
    }
}

export default Code;
