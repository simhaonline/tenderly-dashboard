import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getFormattedResolution,
    getFormattedTimeRange
} from "../../Utils/AnalyticsHelpers";

import {AnalyticsWidgetSizeTypes} from "../../Common/constants";

import {analyticsActions} from "../../Core/actions";

import {Panel, Tag, Icon, Tooltip} from "../../Elements";
import {AnalyticsWidgetChart, SimpleLoader} from "..";

import './AnalyticsWidget.scss';


const widgetSizeClassMap = {
    [AnalyticsWidgetSizeTypes.ONE]: 'AnalyticsWidget--One',
    [AnalyticsWidgetSizeTypes.TWO]: 'AnalyticsWidget--Two',
    [AnalyticsWidgetSizeTypes.THREE]: 'AnalyticsWidget--Three',
    [AnalyticsWidgetSizeTypes.FOUR]: 'AnalyticsWidget--Four',
};

class AnalyticsWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
        };
    }

    async componentDidMount() {
        const {isCustom, analyticsActions, widget, dashboard, project} = this.props;

        let dataResponse;

        if (isCustom) {
            dataResponse = await analyticsActions.fetchCustomAnalyticsWidgetDataForProject(project, dashboard.id, widget.id);
        }

        console.log(dataResponse);
    }

    render() {
        const {widget, project, isCustom} = this.props;
        const {loading} = this.state;

        return (
            <div className={classNames(
                "AnalyticsWidget",
                widgetSizeClassMap[widget.size],
            )}>
                <Panel className="AnalyticsWidget__Panel">
                    <div className="AnalyticsWidget__Header">
                        <div className="AnalyticsWidget__Header__MainInfo">
                            <Link to={`${project.getUrlBase()}/analytics/${widget.id}`} className="AnalyticsWidget__Header__WidgetName">{widget.name}</Link>
                            <div className="MarginLeftAuto DisplayFlex AlignItemsCenter">
                                {(widget.alerts && widget.alerts.length > 0) && <Fragment>
                                    <Tag color="primary-outline" size="small" id={`alerts-widget-${widget.id}`}>
                                        <Icon icon="bell"/>
                                        <span>{widget.alerts.length}</span>
                                    </Tag>
                                    <Tooltip id={`alerts-widget-${widget.id}`}>
                                        <span>This metric has {widget.alerts.length} alerts that are based on it.</span>
                                    </Tooltip>
                                </Fragment>}
                                <div className="Padding1">
                                    <Icon icon="more-vertical"/>
                                </div>
                            </div>
                        </div>
                        {!isCustom && <div className="AnalyticsWidget__Header__SubInfo">
                            <div>
                                <Icon className="MarginRight1 MutedText" icon="calendar"/>
                                <span>{getFormattedTimeRange(widget.time)}</span>
                            </div>
                            <div>
                                <Icon className="MarginRight1 MutedText" icon="clock"/>
                                {getFormattedResolution(widget.resolution)}
                            </div>
                        </div>}
                    </div>
                    {loading && <div className="AnalyticsWidget__Data AnalyticsWidget__Data--Loader">
                        <SimpleLoader/>
                    </div>}
                    {!loading && <div className={classNames(
                        "AnalyticsWidget__Data",
                        `AnalyticsWidget__Data--${widget.type}`,
                    )}>
                        <AnalyticsWidgetChart dataPoints={widget.dataPoints} widget={widget} data={widget.data} type={widget.type}/>
                    </div>}
                    {!isCustom && <div className="AnalyticsWidget__Footer">
                        <div className="AnalyticsWidget__Footer__DataInfo">
                            {widget.show.map(show => <div key={show.event} className="AnalyticsWidget__Footer__DataInfoPill AnalyticsWidget__Footer__DataInfoPill--Show">
                                <Icon icon="target"/>
                                <span>{show.event}</span>
                            </div>)}
                            {!!widget.group && widget.group.length > 0 && widget.group.map(group => <div key={group.variable} className="AnalyticsWidget__Footer__DataInfoPill AnalyticsWidget__Footer__DataInfoPill--Breakdown">
                                <Icon icon="share-2"/>
                                <span>Breakdown by <span className="SemiBoldText">{group.variable}</span></span>
                            </div>)}
                        </div>
                    </div>}
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(AnalyticsWidget);
