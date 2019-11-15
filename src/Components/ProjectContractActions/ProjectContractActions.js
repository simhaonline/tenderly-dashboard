import React from 'react';

import {Card, CardsWrapper, Icon} from "../../Elements";

const ProjectContractActions = ({onAction}) => {
    return (
        <div className="ProjectContractActions">
            <CardsWrapper horizontal>
                <Card selectable>
                    <Icon icon="box"/>
                    <div>View Transactions</div>
                </Card>
                <Card selectable>
                    <Icon icon="eye"/>
                    <div>Disable Contract</div>
                </Card>
                <Card selectable highlightColor="danger">
                    <Icon icon="trash-2"/>
                    <div>Delete Contract</div>
                </Card>
            </CardsWrapper>
        </div>
    );
};

export default ProjectContractActions;
