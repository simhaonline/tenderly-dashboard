import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import {projectActions, authActions} from "../../Core/actions";

import {Container, Page, Alert, Icon} from "../../Elements";
import {ProjectPageLoader, SetupAccountInvitationForm, ProjectInvitationPreview} from "../../Components";

class AcceptInvitationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            acceptedInvitation: false,
        };
    }

    componentDidMount() {
        const {invitationCode, loggedIn} = this.props;

        if (!loggedIn) return;

        if (!invitationCode) {
            return this.setState({
                error: "Invalid URL",
            });
        }

        this.setState({
            inProgress: true,
        });

        this.acceptInvitationCode(invitationCode);
    }

    /**
     * @param {string} invitationCode
     */
    acceptInvitationCode = async (invitationCode) => {
        const {projectActions} = this.props;

        const response = await projectActions.acceptProjectInvitation(invitationCode);

        if (!response.success) {
            return this.setState({
                inProgress: false,
                error: "There was an issue while trying to accept the invitation to this project.",
            });
        }

        return this.setState({
            inProgress: false,
            acceptedInvitation: true,
        });
    };

    /**
     * @param {string} resetPasswordCode
     * @param {string} password
     */
    resetPassword = async (resetPasswordCode, password) => {
        const {authActions} = this.props;

        const response = await authActions.resetPassword(resetPasswordCode, password);

        if (!response.success) {
            return this.setState({
                inProgress: false,
                error: "There was an issue while trying to set the new password for this account.",
            });
        }

        return response.data;
    };

    /**
     * @param {string} username
     */
    setUsername = async (username) => {
        const {authActions} = this.props;

        const response = await authActions.setUsername(username);

        if (!response.success) {
            return this.setState({
                inProgress: false,
                error: "There was an issue while trying to set the username for this account.",
            });
        }

        return response.data;
    };

    handleAccountCreation = async ({username, password}) => {
        const {resetPasswordCode, invitationCode, authActions} = this.props;

        this.setState({
            inProgress: true,
            error: null,
        });

        const token = await this.resetPassword(resetPasswordCode, password);

        if (!token) {
            return;
        }

        await authActions.retrieveToken(token);

        await this.setUsername(username);

        await this.acceptInvitationCode(invitationCode);
    };

    render() {
        const {projectName, projectSlug, projectOwner, loggedIn, inviterName, resetPasswordCode} = this.props;
        const {inProgress, acceptedInvitation, error} = this.state;

        if (acceptedInvitation) {
            return <Redirect to={`/${projectOwner}/${projectSlug}`}/>;
        }

        if (!loggedIn && !resetPasswordCode) {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    flow: "project-invitation",
                },
            }}/>;
        }

        return (
            <Page id="AcceptInvitationPage" wholeScreenPage>
                <Container>
                    <ProjectInvitationPreview inviterName={inviterName} projectName={projectName} showLogo
                                              projectOwner={projectOwner} projectSlug={projectSlug}/>
                    {!loggedIn && !inProgress && <div>
                        <SetupAccountInvitationForm onSubmit={this.handleAccountCreation} inProgress={inProgress}/>
                    </div>}
                    {inProgress && <ProjectPageLoader text="Accepting invitation..."/>}
                    {!inProgress && !!error && <div className="MarginTop4 MaxWidth480 MarginCentered">
                        <Alert color="danger" animation>
                            <Icon icon="alert-triangle" className="MarginRight1"/>
                            <span>{error}</span>
                        </Alert>
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
        projectActions: bindActionCreators(projectActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AcceptInvitationPage);

// localhost:3000/accept-invitation?code=bogdan-feget-iovoje-tojeto&username=HabicBogdan&projectSlug=test-project&projectName=Test%20Project&invitationCode=bogdan-dali-ovo-stvarno-radi&inviterName=Bogdan%20Habic
// localhost:3000/accept-invitation?username=HabicBogdan&projectSlug=test-project&projectName=Test%20Project&invitationCode=bogdan-dali-ovo-stvarno-radi&inviterName=Bogdan%20Habic
