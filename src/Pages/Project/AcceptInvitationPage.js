import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import {projectActions} from "../../Core/actions";

import {Container, Page} from "../../Elements";
import {ProjectPageLoader} from "../../Components";

class AcceptInvitationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            acceptedInvitation: false,
        };
    }

    async componentDidMount() {
        const {actions, code} = this.props;

        if (!code) {
            return this.setState({
                inProgress: false,
                error: "Invalid URL",
            });
        }

        const response = await actions.acceptProjectInvitation(code);

        if (response.success) {
            return this.setState({
                inProgress: false,
                acceptedInvitation: true,
            });
        } else {
            return this.setState({
                inProgress: false,
                error: "There was an issue while trying to accept the invitation to this project.",
            });
        }
    }

    render() {
        const {projectSlug, projectOwner} = this.props;
        const {inProgress, acceptedInvitation, error} = this.state;

        if (acceptedInvitation) {
            return <Redirect to={`/${projectOwner}/${projectSlug}`}/>
        }

        return (
            <Page id="AcceptInvitationPage">
                <Container>
                    {inProgress && <ProjectPageLoader text="Accepting invitation..."/>}
                    {!inProgress && !!error && <div>
                        {error}
                    </div>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const projectSlug = searchParams.get('project') || null;
    const projectOwner = searchParams.get('username') || null;
    const code = searchParams.get('code') || null;

    return {
        projectSlug,
        projectOwner,
        code,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AcceptInvitationPage);
