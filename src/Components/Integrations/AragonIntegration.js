import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Blockies from "react-blockies";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {getNetworkForApiId} from "../../Utils/NetworkHelpers";

import {Contract} from "../../Core/models";
import {projectActions} from "../../Core/actions";

import {Button, Container, Icon, Card} from "../../Elements";
import {ProjectSelect, TenderlyLogo} from "../index";

import AragonLogo from './Logos/aragon_icon.svg';

import './AragonIntegration.scss';

class AragonIntegration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
        };
    }

    async componentDidMount() {
        const {data, projectActions, projects, usernameSet, areProjectsLoaded} = this.props;

        if (!areProjectsLoaded && usernameSet) {
            const projectsResponse = await projectActions.fetchProjects('me');

            if (projectsResponse.success) {
                this.setState({
                    project: projectsResponse.data.find(p => p.slug === data.project),
                });
            }
        } else if (areProjectsLoaded) {
            this.setState({
                project: projects.find(p => p.slug === data.project),
            });
        }
    }

    handleProjectChange = (project) => {
        this.setState({
            project,
        });
    };

    render() {
        const {data, areProjectsLoaded} = this.props;
        const {project} = this.state;

        return (
            <Container>
                <div className="AragonIntegration">
                    <div className="AragonIntegration__Companies">
                        <div>
                            <img src={AragonLogo} width={120} alt=""/>
                        </div>
                        <Icon icon="refresh-cw" className="AragonIntegration__Companies__SyncIcon"/>
                        <div>
                            <TenderlyLogo width={80} symbol/>
                        </div>
                    </div>
                    <h2>Sync contracts from Aragon</h2>
                    {areProjectsLoaded && <Card className="AragonIntegration__ProjectPicker">
                        <h3 className="AragonIntegration__ProjectPicker__Headline">Select Project</h3>
                        <ProjectSelect value={project} onChange={this.handleProjectChange}/>
                    </Card>}
                    <hr className="AragonIntegration__Divider"/>
                    <Card className="AragonIntegration__Contracts">
                        <h3 className="AragonIntegration__Contracts__Headline">Contracts to Sync</h3>
                        {data.contracts.map(contract => <div key={contract.address} className="AragonIntegration__Contracts__Item">
                            <Blockies size={8} scale={5} className="BorderRadius2" seed={Contract.generateUniqueContractId(contract.address, getNetworkForApiId(data.network))}/>
                            <div className="AragonIntegration__Contracts__Item__Info">
                                <div className="AragonIntegration__Contracts__Item__Name">{contract.label}</div>
                                <div className="AragonIntegration__Contracts__Item__Address">{contract.address}</div>
                            </div>
                        </div>)}
                    </Card>
                    <hr className="AragonIntegration__Divider"/>
                    <div>
                        <Button color="secondary" disabled={!project }>
                            <span>Sync Project</span>
                        </Button>
                        <Button color="secondary" outline to="/">
                            <span>Cancel</span>
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        areProjectsLoaded: state.project.projectsLoaded,
        usernameSet: state.auth.usernameSet,
        projects: getDashboardProjects(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AragonIntegration);
