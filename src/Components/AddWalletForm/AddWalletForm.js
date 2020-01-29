import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {searchActions} from "../../Core/actions";

import {Button, Form, Input, Panel, PanelContent} from "../../Elements";

import './AddWalletForm.scss';

class AddWalletForm extends Component {
    state = {
        query: '',
        selectedWallets: [],
    };

    handleQueryChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const {query} = this.state;

        return (
            <Panel className="AddWalletForm MaxWidth480">
                <PanelContent>
                    <Form>
                        <Input field="query" value={query} label="Enter the wallet address or ENS" onChange={this.handleQueryChange}/>
                        <Button>Add Wallets</Button>
                    </Form>
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddWalletForm);
