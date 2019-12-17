import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Blockies from "react-blockies";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {getNetworkForApiId} from "../../Utils/NetworkHelpers";

import {Contract} from "../../Core/models";
import {projectActions} from "../../Core/actions";

import {Button, Container, Icon, Select} from "../../Elements";
import {ProjectSelectOption, TenderlyLogo} from "../index";

import AragonLogo from './Logos/aragon_icon.svg';

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
        const {data, areProjectsLoaded, projects} = this.props;
        const {project} = this.state;

        return (
            <Container>
                <div className="MaxWidth480 MarginLeftAuto MarginRightAuto">
                    <div className="DisplayFlex AlignItemsCenter JustifyContentSpaceAround">
                        <div>
                            <img src={AragonLogo} width={160} alt=""/>
                        </div>
                        <Icon icon="refresh-cw"/>
                        <div>
                            <TenderlyLogo width={110} symbol/>
                        </div>
                    </div>
                    <h2>Sync contracts from Aragon</h2>
                    {areProjectsLoaded && <div>
                        <h3>Select Project</h3>
                        <Select options={projects} getOptionValue={project => project.id} getOptionLabel={project => project.name} value={project} onChange={this.handleProjectChange} components={{
                            Option: ProjectSelectOption,
                            IndicatorSeparator: () => null,
                        }}/>
                    </div>}
                    <hr/>
                    <div>
                        <h3>Contracts to Sync</h3>
                        {data.contracts.map(contract => <div key={contract.address} className="DisplayFlex AlignItemsCenter">
                            <Blockies size={8} scale={5} className="BorderRadius2" seed={Contract.generateUniqueContractId(contract.address, getNetworkForApiId(data.network))}/>
                            <div className="MarginLeft1">
                                <div className="SemiBoldText MarginBottom1">{contract.label}</div>
                                <div className="MonospaceFont LinkText">{contract.address}</div>
                            </div>
                        </div>)}
                    </div>
                    <hr/>
                    <div>
                        <Button color="secondary">
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
