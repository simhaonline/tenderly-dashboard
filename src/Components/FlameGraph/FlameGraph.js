import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {flamegraph} from 'd3-flame-graph';

class FlameGraph extends Component {
    constructor(props) {
        super(props);

        this.flameGraphRef = React.createRef();
    }

    componentDidMount() {
        this.drawFlameGraph();
    }

    drawFlameGraph() {
        const {data} = this.props;

        const element = this.flameGraphRef.current;

        const graph = flamegraph()
            .width(element.offsetWidth)
            .tooltip(false)
            .cellHeight(24)
            .elided(true)
            .inverted(true);

        d3.select(element)
            .datum(data)
            .call(graph);
    }

    render() {
        return (
            <div ref={this.flameGraphRef}/>
        );
    }
}

FlameGraph.propTypes = {
    data: PropTypes.object.isRequired,
};

export default FlameGraph;
