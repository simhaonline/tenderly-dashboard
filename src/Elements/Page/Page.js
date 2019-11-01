import React, {Component, createRef, Fragment} from 'react';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as appActions from "../../Core/App/App.actions";

import {Icon, Tooltip} from "../";

import './Page.scss';

class Page extends Component {
    constructor(props) {
        super(props);

        this.pageRef = createRef();

        this.state = {
            showToTop: false,
        };
    }

    componentDidMount() {
        const {actions, wholeScreenPage, scrollToTopEnabled} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(true);
        }

        if (scrollToTopEnabled && this.pageRef) {
            this.pageRef.current.addEventListener('scroll', this.handlePageScrollEvent);
        }
    }

    componentWillUnmount() {
        const {actions, wholeScreenPage, scrollToTopEnabled} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(false);
        }

        if (scrollToTopEnabled && this.pageRef) {
            this.pageRef.current.removeEventListener('scroll', this.handlePageScrollEvent);
        }
    }

    /**
     * @param {Event} event
     */
    handlePageScrollEvent = ({target}) => {
        const {scrollTop, clientHeight} = target;
        const {showToTop} = this.state;
        const {scrollToTopEnabled} = this.props;

        if (!scrollToTopEnabled) return;

        if (showToTop && scrollTop <= clientHeight) {
            this.setState({
                showToTop: false,
            });
        } else if (!showToTop && scrollTop > clientHeight) {
            this.setState({
                showToTop: true,
            });
        }
    };

    scrollToTopOfPage = () => {
        if (this.pageRef) {
            this.pageRef.current.scrollTo(0,0)
        }
    };

    render() {
        const {children, scrollToTopEnabled, wholeScreenPage, padding, ...props} = this.props;
        const {showToTop} = this.state;

        return (
            <div className={classNames(
                "Page",
                {
                    "NoPadding": !padding,
                }
            )} {...props} ref={this.pageRef}>
                {children}
                {scrollToTopEnabled && showToTop && <Fragment>
                    <div className="Page__ScrollTopButton" id="PageScrollTopButton" onClick={this.scrollToTopOfPage}>
                        <Icon icon="chevrons-up" className="Page__ScrollTopButton__Icon"/>
                    </div>
                    <Tooltip id="PageScrollTopButton" placement="left" showDelay={350} hideDelay={0}>Scroll to top</Tooltip>
                </Fragment>}
            </div>
        );
    }
}

Page.defaultProps = {
    padding: true,
    wholeScreenPage: false,
    scrollToTopEnabled: false,
};

Page.propTypes = {
    wholeScreenPage: PropTypes.bool,
    scrollToTopEnabled: PropTypes.bool,
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
