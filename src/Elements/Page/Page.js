import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as appActions from "../../Core/App/App.actions";

import './Page.css';

class Page extends Component {
    componentDidMount() {
        const {actions, wholeScreenPage} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(true);
        }
    }

    componentWillUnmount() {
        const {actions, wholeScreenPage} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(false);
        }
    }

    render() {
        const {children, wholeScreenPage, ...props} = this.props;

        return (
            <div className="Page" {...props}>
                {children}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(Page);
