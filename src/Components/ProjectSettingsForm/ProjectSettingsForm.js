import React, {Component} from 'react';
import {connect} from "react-redux";

import {Card, Button} from "../../Elements";

import './ProjectSettingsForm.css';

class ProjectSettingsForm extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {project} = this.props;

        console.log(project);

        return (
            <div className="ProjectSettingsForm">
                <Card>
                    <div>{project.name}</div>
                    <div>{project.slug}</div>
                </Card>
                <Card>
                    <Button color="danger" outline>
                        <span>Delete Project</span>
                    </Button>
                </Card>
            </div>
        );
    }
}

export default connect(
    null,
    null,
)(ProjectSettingsForm)
