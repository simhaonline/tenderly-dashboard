import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";

class ProjectEventsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedPage: false,
        };
    }
    async componentDidMount() {
        const {contracts, events, project, eventActions, contractActions} = this.props;

        if (!events.length) {
            await eventActions.fetchEventsForProject(project.id, 0);
        }

        if (!contracts.length) {
            await contractActions.fetchContractsForProject(project.id);
        }

        this.setState({
            loadedPage: true,
        });
    }

    render() {
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
        contracts: [],
        events: [],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventActions: bindActionCreators(eventActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectEventsPage);
