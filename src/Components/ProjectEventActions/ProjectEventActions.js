import React, {Component} from 'react';

import {Button, Icon} from "../../Elements";

class ProjectEventActions extends Component {
    render() {
        return (
            <div className="ProjectEventActions">
                <Button outline size="small">
                    <Icon icon="refresh-cw"/>
                </Button>
                <div className="PaginationControls">
                    <Button outline size="small">
                        <Icon icon="arrow-left"/>
                    </Button>
                    <Button outline size="small">
                        <Icon icon="arrow-right"/>
                    </Button>
                </div>
            </div>
        );
    }
}

export default ProjectEventActions;
