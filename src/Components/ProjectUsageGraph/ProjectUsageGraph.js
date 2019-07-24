import React, {Component} from 'react';
import {Pie, PieChart} from "recharts";
import classNames from 'classnames';

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";

import {Panel, PanelHeader, PanelContent, Icon} from "../../Elements";

import './ProjectUsageGraph.scss';

const networkGraphColorMap = {
    [NetworkTypes.MAIN]: {
        successful: '#00cebb',
        failed: 'rgba(0, 206, 187, 0.5)',
    },
    [NetworkTypes.KOVAN]: {
        successful: '#8700FF',
        failed: 'rgba(135, 0, 255, 0.5)',
    },
};

class ProjectUsageGraph extends Component {
    constructor(props) {
        super(props);

        const {data} = props;

        const networks = Object.keys(data.networkTransactions);

        this.state = {
            networks,
            activeNetwork: networks[0],
        }
    }
    render() {
        const {data} = this.props;
        const {networks, activeNetwork} = this.state;

        const graphData = networks.reduce((graph, network) => {
            graph[network] = [];

            graph[network].push({
                name: `${network}_successful`,
                value: data.transactions[network].successful,
                fill: networkGraphColorMap[network].successful,
            });

            graph[network].push({
                name: `${network}_failed`,
                value: data.transactions[network].failed,
                fill: networkGraphColorMap[network].failed,
            });

            return graph;
        }, {});

        return (
            <Panel className="ProjectUsageGraph">
                <PanelHeader>
                    <h3>Transactions</h3>
                    <div className="MarginLeftAuto">
                        <div className="LastDayChange">
                            <Icon icon={"arrow-up"}/>
                            <span>4.53% (24h)</span>
                        </div>
                    </div>
                </PanelHeader>
                <PanelContent className="GraphsWrapper">
                    {networks.map(network =>
                        <div className={classNames(
                            'GraphItem',
                            {'Active': network === activeNetwork,}
                        )} key={network}>
                            <h5 className="NetworkName">{NetworkLabelMap[network]}</h5>
                            <div className="GraphInfo">
                                <div className="InfoWrapper">
                                    <div className="InfoItem">Successful: <span className="ValueSuccess">{data.transactions[network].successful}</span></div>
                                    <div className="InfoItem">Failed: <span className="ValueFail">{data.transactions[network].failed}</span></div>
                                    <hr/>
                                    <div className="InfoItem">Total: <span>{data.networkTransactions[network]}</span></div>
                                </div>
                                <PieChart width={130} height={130} >
                                    <Pie data={graphData[network]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={60} fill="#df0074" />
                                </PieChart>
                            </div>
                        </div>
                    )}
                </PanelContent>
                <div className="GraphNav">
                    <div className="NavItem">
                        <Icon icon="chevron-left"/>
                    </div>
                    <div className="DotsWrapper">
                        {networks.map(network =>
                            <div className={classNames(
                                'GraphNavDot',
                                {'active': network === activeNetwork,}
                            )} key={network}/>
                        )}
                    </div>
                    <div className="NavItem">
                        <Icon icon="chevron-right"/>
                    </div>
                </div>
            </Panel>
        );
    }
}

export default ProjectUsageGraph;
