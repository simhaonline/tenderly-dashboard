import React, {Component, PureComponent} from 'react';
import * as _ from "lodash";

import './Profiler.scss';

class Node extends PureComponent {
    render() {
        const {data, parentValue, totalValue} = this.props;

        console.log(data, parentValue);

        const width = data.value / parentValue * 100;

        return (
            <div className="ProfilerNode" style={{
                width: `${width}%`,
            }}>
                <div className="ProfilerNode__Label">{data.label}</div>
                {!!data.nodes && !!data.nodes.length && <div className="ProfilerNode__Children">
                    {data.nodes.map((datum, index) => <Node data={datum} key={index} parentValue={data.value} totalValue={totalValue}/>)}
                </div>}
            </div>
        )
    }
}

class Profiler extends Component {
    constructor(props) {
        super(props);

        const {initialResolution} = props;

        this.state = {
            resolution: initialResolution,
        };
    }

    render() {
        const {data} = this.props;
        const {resolution} = this.state;

        console.log(data);

        if (!data || !data.length) {
            return null;
        }

        const totalNodesValue = _.sumBy(data, 'value');

        const totalWidth = totalNodesValue / resolution * 100;

        console.log(totalNodesValue, totalWidth);

        return (
            <div className="Profiler">
                <div className="Profiler__ResolutionWrapper" style={{
                    width: totalWidth,
                }}>

                </div>
                <div className="Profiler__Nodes" style={{
                    width: totalWidth,
                }}>
                    {data.map((datum, index) => <Node data={datum} key={index} parentValue={totalNodesValue} totalValue={totalNodesValue}/>)}
                </div>
            </div>
        );
    }
}

Profiler.defaultProps = {
    initialResolution: 5000,
};

export default Profiler;
