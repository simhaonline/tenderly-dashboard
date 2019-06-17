import React, {Component} from 'react';
import classNames from 'classnames';

import './CodePreview.scss';

class Code extends Component {

    render() {
        const {file, line, linePreview} = this.props;

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
                <div className="CodeContent" style={wrapperStyle}>
                    <div className="StackLines">
                        {lineNumbers.map(num =>
                            <div key={num.number} id={`line-${num.number}`} className={`StackLine ${num.active? 'active': ''}`}>{num.number}</div>
                        )}
                    </div>
                    <pre className="StackCode" style={codeStyle} dangerouslySetInnerHTML={{__html: file.sourceCompiled}}/>
                </div>
            </div>
        )
    }
}

export default Code;
