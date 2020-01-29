import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {Button} from '../../Elements';
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";

import './ExplorerHeader.scss';
import {connect} from "react-redux";
import {ProjectPicker} from "../index";

class ExplorerHeader extends Component {
    render() {
        const {loggedIn} = this.props;

        return (
            <div className="ExplorerHeader">
                {loggedIn && <div className="ExplorerHeader__AppNavigation">
                    <ProjectPicker/>
                </div>}
                {!loggedIn && <div className="ExplorerHeader__Navigation">
                    <Link to="login" className="ExplorerHeader__Navigation__Link">Login</Link>
                    <Button className="ExplorerHeader__Navigation__CtaButton" to="/register">
                        <span>Create Account </span>
                    </Button>
                </div>}

                {loggedIn && <div className="ExplorerHeader__SessionMenu">
                    <SessionHeaderMenu/>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ExplorerHeader);
