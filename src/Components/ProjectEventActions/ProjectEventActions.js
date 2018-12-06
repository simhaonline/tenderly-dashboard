import React, {Component} from 'react';

import MixPanel from "../../Utils/MixPanel";

import {Button, Icon} from "../../Elements";
import {EventActionTypes} from "../../Common/constants";

class ProjectEventActions extends Component {
    handlePreviousEventsPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('Project Events - Previous Page', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.PREVIOUS_PAGE,
            nextPage: page - 1,
        });
    };

    handleNextEventsPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('Project Events - Next Page', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.NEXT_PAGE,
            nextPage: page + 1,
        });
    };

    handleRefreshPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('Project Events - Refresh Page', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.REFRESH,
        });
    };

    render() {
        return (
            <div className="ProjectEventActions">
                <Button outline size="small" onClick={this.handleRefreshPage}>
                    <Icon icon="refresh-cw"/>
                </Button>
                <div className="PaginationControls">
                    <Button outline size="small" onClick={this.handlePreviousEventsPage}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <Button outline size="small" onClick={this.handleNextEventsPage}>
                        <Icon icon="arrow-right"/>
                    </Button>
                </div>
            </div>
        );
    }
}

ProjectEventActions.defaultProps = {
    onAction: () => {},
};

export default ProjectEventActions;
