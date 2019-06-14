import React, {Component} from 'react';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as appActions from "../../Core/App/App.actions";

import './Page.scss';

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
        const {children, wholeScreenPage, padding, ...props} = this.props;

        return (
            <div className={classNames(
                "Page",
                {
                    "NoPadding": !padding,
                }
            )} {...props}>
                {children}
            </div>
        );
    }
}

Page.defaultProps = {
    padding: true,
    wholeScreenPage: false,
};

Page.propTypes = {
    wholeScreenPage: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(Page);
