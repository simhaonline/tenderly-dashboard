import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {Button} from '../../Elements';

import './ExplorerHeader.scss';

class ExplorerHeader extends Component {
    render() {
        return (
            <div className="ExplorerHeader">
                <div className="ExplorerHeader__Navigation">
                    <Link to="login">Login</Link>
                    <Button className="ExplorerHeader__Navigation__CtaButton" to="/register">
                        <span>Create Account </span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default ExplorerHeader;
