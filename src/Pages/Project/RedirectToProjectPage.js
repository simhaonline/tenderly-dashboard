import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import {ProjectPageLoader} from "../../Components";

class RedirectToProjectPage extends Component {
    render() {
        const {projectSlug, loggedIn, user} = this.props;

        if (loggedIn && user) {
            const [,suffixPath] = this.props.location.pathname.split(projectSlug);

            return <Redirect to={`/${user.username}/${projectSlug}${suffixPath}`}/>
        }

        return <ProjectPageLoader text="Fetching Project..."/>;
    }
}

const mapStateToProps = (state, ownProps) =>{
    const {match: {params: {slug}}} = ownProps;

    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        projectSlug: slug,
    };
};

export default connect(
    mapStateToProps,
)(RedirectToProjectPage);
