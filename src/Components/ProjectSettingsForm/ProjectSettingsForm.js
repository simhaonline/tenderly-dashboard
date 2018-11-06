import React, {Component} from 'react';
import {connect} from "react-redux";

import {Card} from "../../Elements";

import './ProjectSettingsForm.css';

class ProjectSettingsForm extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {project} = this.props;

        console.log(project);

        return (
            <Card className="ProjectSettingsForm">
                <div>{project.name}</div>
                <div>{project.slug}</div>
            </Card>
        );
    }
}

export default connect(
    null,
    null,
)(ProjectSettingsForm)
