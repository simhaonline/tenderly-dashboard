import React, {Component, createRef, Fragment} from 'react';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

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
        const {actions, wholeScreenPage} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(true);
        }

        if (this.pageRef) {
            this.pageRef.current.addEventListener('scroll', this.handlePageScrollEvent);
        }
    }

    componentWillUnmount() {
        const {actions, wholeScreenPage} = this.props;

        if (wholeScreenPage) {
            actions.setWholeScreenPage(false);
        }

        if (this.pageRef) {
            this.pageRef.current.removeEventListener('scroll', this.handlePageScrollEvent);
        }
    }

    /**
     * @param {Event} event
     */
    handlePageScrollEvent = ({target}) => {
        const {scrollTop, clientHeight} = target;
        const {showToTop} = this.state;

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
        const {children, wholeScreenPage, tabs, padding, ...props} = this.props;
        const {showToTop} = this.state;

        return (
            <div className="Page">
                {!!tabs && tabs.length > 0 && <div className="Page__TabsHeader">
                    {tabs.map(tab => <NavLink className="Page__Tab" to={tab.route} exact activeClassName="Page__Tab--Active" key={tab.route}>
                        {!!tab.icon && <Icon icon={tab.icon} className="Page__Tab__Icon"/>}
                        <span className="Page__Tab__Label">{tab.label}</span>
                    </NavLink>)}
                </div>}
                <div className={classNames(
                    "Page__Content",
                    {
                        "Page__Content--NoPadding": !padding,
                    }
                )} {...props} ref={this.pageRef}>{children}</div>
                {showToTop && <Fragment>
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
};

Page.propTypes = {
    wholeScreenPage: PropTypes.bool,
    tabs: PropTypes.array,
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
