import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import {projectActions, authActions} from "../../Core/actions";

import {Container, Page, Alert, Icon, Button} from "../../Elements";
import {ProjectPageLoader, SetupAccountInvitationForm, ProjectInvitationPreview} from "../../Components";

class AcceptInvitationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingUpAccount: false,
            acceptingInvite: false,
            acceptedInvitation: false,
            declinedInvitation: false,
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
    }

    /**
     * @param {boolean} accept
     */
    acceptInvitationCode = async (accept) => {
        const {invitationCode, projectActions} = this.props;

        this.setState({
            acceptingInvite: true,
        });

        const response = await projectActions.acceptProjectInvitation(accept, invitationCode);

        if (!response.success) {
            return this.setState({
                acceptingInvite: false,
                error: `There was an issue while trying to ${accept ? 'accept' : 'decline'} the invitation to this project.`,
            });
        }

        return this.setState({
            acceptingInvite: false,
            acceptedInvitation: accept === true,
            declinedInvitation: accept === false,
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
                settingUpAccount: false,
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
                settingUpAccount: false,
                error: "There was an issue while trying to set the username for this account.",
            });
        }

        return response.data;
    };

    handleAccountCreation = async ({username, password}) => {
        const {resetPasswordCode, authActions} = this.props;

        this.setState({
            settingUpAccount: true,
            error: null,
        });

        const token = await this.resetPassword(resetPasswordCode, password);

        if (!token) {
            return;
        }

        await authActions.retrieveToken(token);

        await this.setUsername(username);

        this.setState({
            settingUpAccount: false,
        });
    };

    render() {
        const {projectName, projectSlug, projectOwner, loggedIn, inviterName, resetPasswordCode} = this.props;
        const {settingUpAccount, acceptingInvite, acceptedInvitation, declinedInvitation, error} = this.state;

        if (acceptedInvitation) {
            return <Redirect to={`/${projectOwner}/${projectSlug}`}/>;
        }

        if (declinedInvitation) {
            return <Redirect to={`/dashboard`}/>;
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
                    {!loggedIn && <div>
                        <SetupAccountInvitationForm onSubmit={this.handleAccountCreation} inProgress={settingUpAccount}/>
                    </div>}
                    {!settingUpAccount && !acceptingInvite && loggedIn && <div className="MaxWidth480 MarginCentered">
                        <div className="DisplayFlex JustifyContentCenter">
                            <Button color="secondary" onClick={() => this.acceptInvitationCode(true)} stretch size="large">
                                <span>Accept</span>
                            </Button>
                            <Button color="secondary" outline onClick={() => this.acceptInvitationCode(false)} stretch size="large">
                                <span>Decline</span>
                            </Button>
                        </div>
                    </div>}
                    {!settingUpAccount && acceptingInvite && loggedIn && <ProjectPageLoader text="Accepting invitation..."/>}
                    {!settingUpAccount && !acceptingInvite && !!error && <div className="MarginTop4 MaxWidth480 MarginCentered">
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
