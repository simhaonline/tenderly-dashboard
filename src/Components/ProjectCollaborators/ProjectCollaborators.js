import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Collaborator, Project} from "../../Core/models";

import {Panel, PanelHeader, PanelContent, List, ListItem} from "../../Elements";

class ProjectCollaborators extends Component {
    render() {
        return (
            <div>
                <Panel>
                    <PanelHeader>
                        <h3>qwe</h3>
                    </PanelHeader>
                    <PanelContent>
                        <List>
                            <ListItem>
                                Collab1
                            </ListItem>
                            <ListItem>
                                Collab1
                            </ListItem>
                        </List>
                    </PanelContent>
                </Panel>
            </div>
        );
    }
}

ProjectCollaborators.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.instanceOf(Collaborator)).isRequired,
};

export default ProjectCollaborators;
