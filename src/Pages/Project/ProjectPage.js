import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";
import {Page, Container} from "../../Elements";

import './ProjectPage.css';

class ProjectPage extends Component {
    render(){
        return (
            <Page id="ProjectPage">
                <Container>
                    <h2>Project setup</h2>
                    <div className="ProjectSetupWrapper">
                        <p>In order to monitor your contracts you need to install tenderly cli and have truffle configured</p>
                        <p>To install tenderly</p>
                        <p>On macOS</p>
                        <code>
                            brew tap tenderly/tenderly
                            <br/>
                            brew install tenderly
                        </code>
                        <p>To login into your tenderly account</p>
                        <code>
                            tenderly login
                        </code>
                        <p>In your project folder where truffle is configured run</p>
                        <code>
                            tenderly init
                        </code>
                        <p>Start monitoring your contracts by doing</p>
                        <code>
                            tenderly push
                        </code>
                    </div>
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
)(ProjectPage);
