import React, {Component} from 'react';

import {Button, Card, CardsWrapper, Dialog, DialogBody, DialogHeader, Icon} from "../../Elements";
import {withRouter} from "react-router-dom";

class ProjectContractActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleModalOpen: false,
            deleteModalOpen: false
        }
    }

    openModal = (modal) => {
        this.setState({
            [modal]: true
        })
    };

    closeModal = (modal) => {
        this.setState({
            [modal]: false
        })
    };

    closeAllModal = () => {
        this.setState({
            toggleModalOpen: false,
            deleteModalOpen: false
        })
    };

    handleAction = async (actionName) => {
        const {onAction, contract} = this.props;
        await onAction({
            type: actionName,
            contract,
        });
        this.closeAllModal();
    };

    viewTransactionsForContract = () => {
        const {contract, history, project} = this.props;

        history.push({
            pathname: `${project.getUrlBase()}/transactions`,
            search: `contracts=${contract.id}`
        })
    };

    render() {
        const {toggleModalOpen, deleteModalOpen} = this.state;
        const {projectContract, contract} = this.props;
        const currentRevision = projectContract.getRevision(contract.id);

        return (
            <div className="ProjectContractActions">
                <CardsWrapper horizontal>
                    <Card selectable className='DisplayFlex FlexDirectionColumn AlignItemsCenter' onClick={this.viewTransactionsForContract}>
                        <Icon icon="box" className='FontSize4 MarginBottom1'/>
                        <div>View Transactions</div>
                    </Card>
                    <Card selectable onClick={()=> this.openModal('toggleModalOpen')} className='DisplayFlex FlexDirectionColumn AlignItemsCenter'>
                        <Icon icon={currentRevision.enabled ? 'eye-off' : 'eye'} className='FontSize4 MarginBottom1'/>
                        <div>{currentRevision.enabled ? 'Hide': 'Show'} Contract</div>
                    </Card>
                    <Card selectable highlightColor="danger" onClick={()=> this.openModal('deleteModalOpen')} className='DisplayFlex FlexDirectionColumn AlignItemsCenter'>
                        <Icon icon="trash-2" className='FontSize4 MarginBottom1'/>
                        <div>Delete Contract</div>
                    </Card>
                </CardsWrapper>
                <Dialog open={toggleModalOpen} onClose={()=> this.closeModal('toggleModalOpen')}>
                    <DialogHeader>
                        <h3>{currentRevision.enabled ? 'Hide contract from': 'Show contract in'} the transaction listing</h3>
                    </DialogHeader>
                    <DialogBody>
                        <p>Are you sure you wish to {currentRevision.enabled ? 'hide' : 'show'} this contract {currentRevision.enabled ? 'from' : 'in'} the transaction listing?</p>
                        <div className='MarginTop2'>
                            <Button color='secondary' onClick={()=> this.handleAction('toggle_contract')}>
                                <span>Yes, {currentRevision.enabled ? 'hide' : 'show'}</span>
                            </Button>
                            <Button color='secondary' outline onClick={()=> this.closeModal('toggleModalOpen')}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </DialogBody>

                </Dialog>
                <Dialog open={deleteModalOpen} onClose={()=> this.closeModal('deleteModalOpen')}>
                    <DialogHeader>
                        <h3>Delete Contract</h3>
                    </DialogHeader>
                    <DialogBody>
                        <p>Are you sure you wish to delete this contract? This will remove all the transactions related to this contract, and affect any alerts that use this contract.</p>
                        <div className='MarginTop2'>
                            <Button color='danger' onClick={()=> this.handleAction('delete_contract')}>
                                <span>Yes, delete</span>
                            </Button>
                            <Button color='danger' outline onClick={()=> this.closeModal('deleteModalOpen')}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(ProjectContractActions);
