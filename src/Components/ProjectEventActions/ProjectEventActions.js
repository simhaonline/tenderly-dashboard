import React, {Component} from 'react';

import MixPanel from "../../Utils/MixPanel";

import {Button, Icon} from "../../Elements";
import {EventActionTypes} from "../../Common/constants";

import './ProjectEventActions.scss';
import PaginationControls from "../PaginationControls/PaginationControls";

class ProjectEventActions extends Component {
    handlePreviousEventsPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('project_events_previous_page', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.PREVIOUS_PAGE,
            nextPage: page - 1,
        });
    };

    handleNextEventsPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('project_events_next_page', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.NEXT_PAGE,
            nextPage: page + 1,
        });
    };

    handleRefreshPage = () => {
        const {onAction, page} = this.props;

        MixPanel.track('project_events_refresh_data', {
            currentPage: page,
        });

        onAction({
            type: EventActionTypes.REFRESH,
        });
    };

    render() {
        const {page, loading} = this.props;

        return (
            <div className="ProjectEventActions">
                <div className="GeneralActions">
                    <Button outline size="small" onClick={this.handleRefreshPage} disabled={loading}>
                        <Icon icon="refresh-cw"/>
                        <span>Refresh</span>
                    </Button>
                </div>
                <div className="PaginationControlsWrapper">
                    <PaginationControls onPrevious={this.handlePreviousEventsPage}
                                        onNext={this.handleNextEventsPage}
                                        current={page}
                                        disabled={loading}/>
                </div>
            </div>
        );
    }
}

ProjectEventActions.defaultProps = {
    onAction: () => {},
};

export default ProjectEventActions;
