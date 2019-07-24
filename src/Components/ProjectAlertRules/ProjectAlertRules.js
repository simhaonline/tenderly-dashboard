import React, {Component, Fragment} from 'react';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Button, Icon, Panel, PanelContent, PanelHeader, Form, List, ListItem} from "../../Elements";

class ProjectAlertRules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingRule: false,
        };

        initializeForm(this, {
            type: '',
            password: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    openCreateRule = () => {
        this.setState({
            creatingRule: true,
        });
    };

    backToRulesList = () => {
        this.setState({
            creatingRule: false,
        });
    };

    handleCreateRuleSubmit = () => {

    };

    render() {
        const {creatingRule} = this.state;

        return (
            <Fragment>
                {!creatingRule && <Panel>
                    <PanelHeader>
                        <h3>Rules</h3>
                        <div className="MarginLeftAuto">`
                            <Button size="small" onClick={this.openCreateRule}>
                                <Icon icon="plus"/>
                                <span>Create Rule</span>
                            </Button>
                        </div>
                    </PanelHeader>
                    <PanelContent>
                        <div className="ActiveRules">
                            <List>
                                <ListItem>
                                    one rule
                                </ListItem>
                            </List>
                        </div>
                    </PanelContent>
                </Panel>}
                {creatingRule && <Panel>
                    <PanelHeader>
                        <h3>Create Rule</h3>
                        <div className="MarginLeftAuto">`
                            <Button size="small" outline onClick={this.backToRulesList}>
                                <Icon icon="arrow-left"/>
                                <span>Back to Rules</span>
                            </Button>
                        </div>
                    </PanelHeader>
                    <PanelContent>
                        <Form onSubmit={this.handleCreateRuleSubmit}>
                            <div>
                                <Button type="submit">
                                    <span>Create</span>
                                </Button>
                                <Button outline onClick={this.backToRulesList}>
                                    <span>Cancel</span>
                                </Button>
                            </div>
                        </Form>
                    </PanelContent>
                </Panel>}
            </Fragment>
        );
    }
}

export default ProjectAlertRules;
