import React, {PureComponent} from 'react';

import './Code.css';

class Code extends PureComponent {
    render() {
        const {children} = this.props;

        return (
            <code className="Code">{children}</code>
        );
    }
}

export default Code;
