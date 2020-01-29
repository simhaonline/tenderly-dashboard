import React, {Component, createRef, PureComponent} from 'react';
import * as _ from "lodash";

import './Profiler.scss';

class Node extends PureComponent {
    render() {
        const {data, parentValue, totalValue} = this.props;

        // console.log(data, parentValue);

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

        this.profilerRef = createRef();

        this.state = {
            resolution: initialResolution,
            offsetLeft: 0,
            offsetTop: 0,
        };
    }

    componentDidMount() {
        this.setState({
            currentViewWidth: this.profilerRef.current.clientWidth,
        });
    }

    render() {
        const {data} = this.props;
        const {resolution, currentViewWidth, offsetLeft} = this.state;

        // console.log(data);

        if (!data || !data.length) {
            return null;
        }

        const totalNodesValue = _.sumBy(data, 'value');

        const totalWidth = totalNodesValue / resolution * 200;

        const upperResolution = _.ceil(resolution, -3);

        console.log(totalNodesValue, upperResolution);


        return (
            <div className="Profiler" ref={this.profilerRef}>
                <div className="Profiler__OverviewWrapper">
                    <div className="Profiler__OverviewWrapper__Bar" style={{
                        width: `${currentViewWidth / totalWidth * 100}%`,
                        left: `${offsetLeft / totalNodesValue * 100}%`,
                    }}/>
                </div>
                <div className="Profiler__View">
                    <div className="Profiler__ResolutionWrapper" style={{
                        width: totalWidth,
                        left: `-${totalWidth * offsetLeft / totalNodesValue}px`,
                    }}>
                        {[...Array(parseInt(totalNodesValue / upperResolution))].map((e, index) => <div className="Profiler__ResolutionWrapper__Bar" key={index} style={{
                            width: `${upperResolution / resolution * 200}px`
                        }}>
                            {index * upperResolution}
                        </div>)}
                    </div>
                    <div className="Profiler__NodesWrapper">
                        <div className="Profiler__Nodes" style={{
                            width: totalWidth,
                            left: `-${totalWidth * offsetLeft / totalNodesValue}px`,
                        }}>
                            {data.map((datum, index) => <Node data={datum} key={index} parentValue={totalNodesValue} totalValue={totalNodesValue}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiler.defaultProps = {
    initialResolution: 9745,
};

export default Profiler;
