import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import {projectActions} from "../../Core/actions";

import {Container, Page} from "../../Elements";
import {ProjectPageLoader, ProjectInvitationPreview} from "../../Components";

class AcceptInvitationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            acceptedInvitation: false,
        };
    }

    async componentDidMount() {
        const {actions, invitationCode, loggedIn} = this.props;

        if (!loggedIn) return;

        if (!invitationCode) {
            return this.setState({
                inProgress: false,
                error: "Invalid URL",
            });
        }

        const response = await actions.acceptProjectInvitation(invitationCode);

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
        const {projectName, projectSlug, projectOwner, loggedIn, inviterName} = this.props;
        const {inProgress, acceptedInvitation, error} = this.state;

        if (acceptedInvitation) {
            return <Redirect to={`/${projectOwner}/${projectSlug}`}/>;
        }

        return (
            <Page id="AcceptInvitationPage" wholeScreenPage>
                <Container>
                    <ProjectInvitationPreview inviterName={inviterName} projectName={projectName}
                                              projectOwner={projectOwner} projectSlug={projectSlug}/>
                    {!loggedIn && <div>

                    </div>}
                    {loggedIn && inProgress && <ProjectPageLoader text="Accepting invitation..."/>}
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

    const projectSlug = searchParams.get('projectSlug') || null;
    const projectName = searchParams.get('projectName') || null;
    const projectOwner = searchParams.get('username') || null;
    const resetPasswordCode = searchParams.get('code') || null;
    const invitationCode = searchParams.get('invitationCode') || null;
    const inviterName = searchParams.get('inviterName') || null;

    return {
        projectSlug,
        projectOwner,
        invitationCode,
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        resetPasswordCode,
        projectName,
        inviterName,
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

// localhost:3000/accept-invitation?code=bogdan-feget-iovoje-tojeto&username=HabicBogdan&projectSlug=test-project&projectName=Test%20Project&invitationCode=bogdan-dali-ovo-stvarno-radi&inviterName=Bogdan%20Habic
