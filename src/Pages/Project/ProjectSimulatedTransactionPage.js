import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getSimulatedTransactionData} from "../../Common/Selectors/SimulatorSelectors";
import {Button, Container, Icon, Page, PageHeading, PanelContent} from "../../Elements";
import {EmptyState, TransactionPageContent} from "../../Components";
import Panel from "../../Elements/Panel/Panel";

class ProjectSimulatedTransactionPage extends Component {
    constructor(props) {
        super(props);
        const {match: {params: {id}}, project} = props;
        const routeBase = `${project.getUrlBase()}/simulator/${id}`;
        this.state = {
            tabs: [
                {
                    route: `${routeBase}`,
                    label: 'Overview',
                    icon: 'align-right',
                },
                {
                    route: `${routeBase}/contracts`,
                    label: 'Contracts',
                    icon: 'file-text',
                },
                {
                    route: `${routeBase}/logs`,
                    label: 'Events',
                    icon: 'bookmark',
                },
                {
                    route: `${routeBase}/state-diff`,
                    label: 'State Changes',
                    icon: 'code',
                },
                {
                    route: `${routeBase}/debugger`,
                    label: 'Debugger',
                    icon: 'terminal',
                },
                {
                    route: `${routeBase}/gas-usage`,
                    label: 'Gas Profiler',
                    icon: 'cpu',
                },
            ]
        }
    }

    render() {
        const {transaction, callTrace, stackTrace, eventLogs, stateDiffs, project, consoleLogs, contracts} = this.props;
        const {tabs} = this.state;

        if (!transaction) {
            return <Page>
                <Container>
                    <PageHeading>
                        <Button to={`${project.getUrlBase()}/simulator`} outline>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>
                            Simulated Transaction
                        </h1>

                    </PageHeading>
                    <Panel>
                        <PanelContent>
                            <EmptyState icon="airplay" title="Simulation does not exist"
                                        description="We were not able to find a simulated transaction with this ID"
                                        renderActions={() => <Button to={`${project.getUrlBase()}/simulator/new`}
                                                                     color="secondary">
                                            <span>Run Simulation</span>
                                        </Button>}/>
                        </PanelContent>
                    </Panel>
                </Container>
            </Page>
        }

        return (
            <Page tabs={tabs}>
                <Container>
                    <PageHeading>
                        <Button to={`${project.getUrlBase()}/simulator`} outline>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>
                            Simulated Transaction
                        </h1>
                        <div className="MarginLeftAuto">
                            <Button to={`${project.getUrlBase()}/simulator/new`}>
                            <span>
                                Run new Simulation
                            </span>
                            </Button>
                        </div>
                    </PageHeading>
                    <TransactionPageContent transaction={transaction} contracts={contracts} stackTrace={stackTrace}
                                            callTrace={callTrace} project={project} eventLogs={eventLogs}
                                            stateDiffs={stateDiffs} consoleLogs={consoleLogs} simulated/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username, id}}} = ownProps;
    const project = getProjectBySlugAndUsername(state, slug, username);
    const txData = getSimulatedTransactionData(state, id);
    return {
        project,
        transaction: txData.transaction,
        contracts: txData.contracts,
        callTrace: txData.callTrace,
        stackTrace: txData.stackTrace,
        eventLogs: txData.eventLogs,
        stateDiffs: txData.stateDiffs,
        consoleLogs: txData.consoleLogs,
    }
};

export default connect(
    mapStateToProps,
)(ProjectSimulatedTransactionPage);