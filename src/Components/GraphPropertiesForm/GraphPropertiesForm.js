import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelContent} from "../../Elements";

class GraphPropertiesForm extends PureComponent {
    render() {
        return (
            <Panel className="MarginRight4 MaxWidth480">
                <PanelContent>
                    <h4>Property</h4>
                    <h4>Breakdown</h4>
                    <h4>Aggregation</h4>
                    <h4>Time Range</h4>
                </PanelContent>
            </Panel>
        );
    }
}

GraphPropertiesForm.propTypes = {};

export default GraphPropertiesForm;