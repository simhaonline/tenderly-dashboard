import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getFormattedResolution,
    getFormattedTimeRange
} from "../../Utils/AnalyticsHelpers";

import {AnalyticsWidgetResolutionTypes, AnalyticsWidgetSizeTypes, TimeUnitLabelMap} from "../../Common/constants";

import {analyticsActions} from "../../Core/actions";

import {Panel, Tag, Icon, Tooltip, DropdownToggle, DropdownMenu, DropdownItem} from "../../Elements";
import {AnalyticsWidgetChart, SimpleLoader} from "..";

import './AnalyticsWidget.scss';
import {action} from "@storybook/addon-actions";
import Dropdown from "../../Elements/Dropdown/Dropdown";


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
            widgetData: null,
        };
    }

    async componentDidMount() {
        const {isCustom, analyticsActions, widget, project} = this.props;

        let dataResponse;

        if (isCustom) {
            dataResponse = await analyticsActions.fetchCustomAnalyticsWidgetDataForProject(project, widget);
        }

        if (!dataResponse.success) {
            // @TODO Set error state
            return ;
        }

        this.setState({
            loading: false,
            widgetData: dataResponse.data,
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        const {widget, project, analyticsActions} = this.props;
        if (prevProps.widget !== widget){
            this.setState({
                loading: true,
            });
            const dataResponse = await analyticsActions.fetchCustomAnalyticsWidgetDataForProject(project, widget);
            this.setState({
                loading: false,
                widgetData: dataResponse.data,
            })
        }
    }

    handleWidgetResolutionChange = (resolution) => {
      const {widget, project, analyticsActions} = this.props;

      analyticsActions.updateCustomAnalyticsWidgetForProject(project, widget, {resolution})
    };

    render() {
        const {widget, project, isCustom} = this.props;
        const {loading, widgetData} = this.state;

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
                        <div className="AnalyticsWidget__Header__SubInfo">
                            {!!widget.time && <div>
                                <Icon className="MarginRight1 MutedText" icon="calendar"/>
                                <span>{getFormattedTimeRange(widget.time)}</span>
                            </div>}
                            {!!widget.resolution && <div>
                                <Dropdown>
                                    <DropdownToggle>
                                        <Icon className="MarginRight1 MutedText" icon="clock"/>
                                        {getFormattedResolution(widget.resolution)}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {Object.values(AnalyticsWidgetResolutionTypes).map(resolution =>
                                            <DropdownItem key={resolution} onClick={() => this.handleWidgetResolutionChange(resolution)}>
                                            <Icon className="MarginRight1 MutedText" icon="clock"/>
                                            <span>{TimeUnitLabelMap[resolution]}</span>
                                        </DropdownItem>)}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>}
                        </div>
                    </div>
                    {loading && <div className="AnalyticsWidget__Data AnalyticsWidget__Data--Loader">
                        <SimpleLoader/>
                    </div>}
                    {!loading && <div className={classNames(
                        "AnalyticsWidget__Data",
                        `AnalyticsWidget__Data--${widget.type}`,
                    )}>
                        {!!widgetData && <AnalyticsWidgetChart dataPoints={widgetData.dataPoints} widget={widget} data={widgetData.data}/>}
                        {!widgetData && <div>
                            No data
                        </div>}
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
