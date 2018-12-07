import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as projectActions from "../../Core/Project/Project.actions";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectSettingsForm, ProjectSettingsActions, ProjectSettingsBilling, FeatureFlag, PageSegmentSwitcher} from "../../Components";
import {FeatureFlagTypes} from "../../Common/constants";

import './ProjectSettingsPage.css';

const SettingsSegments = [
    {
        label: 'General',
        value: 'general',
    },
    {
        label: 'Billing',
        value: 'billing',
        featureFlag: FeatureFlagTypes.BILLING,
    },
];

class ProjectSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectDeleted: false,
            currentSegment: 'general',
        };
    }

    handleProjectAction = async (action) => {
        const {actions, project} = this.props;

        switch (action.type) {
            case "DELETE":
                this.setState({
                    projectDeleted: true,
                });

                await actions.deleteProject(project.id);
                break;
            default:
                break;
        }
    };

    /**
     * @param {String} segment
     */
    handleSegmentSwitch = (segment) => {
        this.setState({
            currentSegment: segment,
        });
    };

    render() {
        const {project} = this.props;
        const {projectDeleted, currentSegment} = this.state;

        if (projectDeleted) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="ProjectSettingsPage">
                <Container className="SettingsContainer">
                    <div className="SettingsSwitcherWrapper">
                        <PageSegmentSwitcher current={currentSegment} options={SettingsSegments} onSelect={this.handleSegmentSwitch}/>
                    </div>
                    {currentSegment === 'general' && <div className="SettingsSegmentContent">
                        <ProjectSettingsForm project={project}/>
                        <ProjectSettingsActions onAction={this.handleProjectAction}/>
                    </div>}
                    <FeatureFlag flag={FeatureFlagTypes.BILLING}>
                        {currentSegment === 'billing' && <div className="SettingsSegmentContent">
                            <ProjectSettingsBilling/>
                        </div>}
                    </FeatureFlag>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSettingsPage);
