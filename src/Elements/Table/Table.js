import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import {Panel, Icon} from "../index";
import {SimpleLoader} from "../../Components";

import './Table.scss';

const TableColumn = ({configuration = {}, value, data, metadata}) => {
    return (
        <div className={classNames(
            "Table__Column",
            "Table__Column--Body",
            configuration.className,
        )} style={{
            flex: configuration.size ? `0 0 ${configuration.size}px` : undefined,
        }}>
            {!!value && <span>{value}</span>}
            {!value && !!configuration.renderColumn && configuration.renderColumn(data, metadata)}
            {!value && !configuration.renderColumn && <span>{data[configuration.accessor]}</span>}
        </div>
    );
};

const TableRow = ({className, onClick, clickable = false, row, index, configuration, metadata}) => {
    return (
        <div className={classNames(
            "Table__Row",
            className,
            {
                "Table__Row--Even": !!(index % 2),
                "Table__Row--Clickable": clickable,
            },
        )} onClick={event => onClick(row, event)}>
            {configuration.map((conf, index) => <TableColumn key={index} configuration={conf} data={row} metadata={metadata}/>)}
        </div>
    );
};

class Table extends Component {
    /**
     * @param {Object} rowData
     * @param {number} index
     * @return {string|number}
     */
    getKeyAccessor = (rowData, index) => {
        const {keyAccessor} = this.props;

        if (!keyAccessor) {
            return index;
        }

        if (typeof keyAccessor === 'string') {
            return rowData[keyAccessor];
        }

        return keyAccessor(rowData);
    };

    /**
     * @param {Object} row
     * @param event
     */
    handleRowClick = (row, event) => {
        const {onRowClick} = this.props;

        if (onRowClick) {
            onRowClick(row, event);
        }
    };

    /**
     * @param {number} nextPage
     * @param event
     */
    handlePageChange = (nextPage, event) => {
        const {data, onPageChange, loading} = this.props;

        if (loading || nextPage <= 0 || (nextPage !== 1 && data.length === 0)) {
            return;
        }

        onPageChange(nextPage, event);
    };

    render() {
        const {configuration, loading, data, className, minWidth, rowClassName, headClassName, currentPage, perPage, onPerPageChange, onRowClick, metadata, groupBy, groupingConfiguration, emptyStateLabel} = this.props;

        return (
            <Panel className={classNames(
                "Table",
                className,
            )}>
                <div className={classNames(
                    "Table__Content",
                    {
                        "Table__Content--Scrollable": !!minWidth,
                    }
                )}>
                    <div className={classNames(
                        "Table__Head",
                        headClassName,
                    )} style={{
                        minWidth: minWidth,
                    }}>
                        {configuration.map((conf, index) => (
                            <div key={index} className={classNames(
                                "Table__Column",
                                "Table__Column--Head",
                                conf.className,
                            )} style={{
                                flex: conf.size ? `0 0 ${conf.size}px` : undefined,
                            }}>
                                {conf.label}
                            </div>
                        ))}
                    </div>
                    <div className={classNames(
                        "Table__Body",
                    )} style={{
                        minWidth: minWidth,
                    }}>
                        {loading && <div className="Table__Body_Loading">
                            <div className="Table__Body_Loading_Loader">
                                <SimpleLoader inverse/>
                            </div>
                        </div>}
                        {!data.length && <div className="Table__Body__Empty__State">
                            <Icon icon="triangle" className="Table__Body__Empty__State__Icon"/>
                            <span className="MutedText">{emptyStateLabel}</span>
                        </div>}
                        {!groupBy && data.map((row, index) => <TableRow key={this.getKeyAccessor(row, index)} index={index}
                                                                        row={row} configuration={configuration}
                                                                        onClick={this.handleRowClick} clickable={!!onRowClick}
                                                                        className={rowClassName} metadata={metadata}/>)}
                        {!!groupBy && _.map(_.groupBy(data, groupBy), (groupData, groupByKey) => <div key={groupByKey} className="Table__Group">
                            <div className="Table__Group__Heading">
                                {!groupingConfiguration && <TableColumn value={groupByKey}/>}
                                {!!groupingConfiguration && groupingConfiguration.map((groupConf, index) => <TableColumn key={index} configuration={groupConf} data={groupData}/>)}
                            </div>
                            {groupData.map((row, index) => <TableRow key={this.getKeyAccessor(row, index)} index={index}
                                                                     row={row} configuration={configuration}
                                                                     onClick={this.handleRowClick} clickable={!!onRowClick}
                                                                     className={rowClassName} metadata={metadata}/>)}
                        </div>)}
                    </div>
                </div>
                {!!currentPage && <div className={"Table__Controls"}>
                    {!!perPage && <div className="Table__Controls__PerPage">
                        <div className="Table__Controls__PerPage__Label">
                            Per Page
                        </div>
                        {[10, 20, 50].map(perPageValue => <div key={perPageValue} className={classNames(
                            "Table__Controls__PerPage__Option",
                            {
                                "Table__Controls__PerPage__Option--Active": perPageValue === perPage,
                            },
                        )} onClick={event => onPerPageChange(perPageValue, event)}>
                            {perPageValue}
                        </div>)}
                    </div>}
                    <div className="Table__Controls__Pagination">
                        <div className="Table__Controls__Pagination__Label">
                            Page
                        </div>
                        <div onClick={event => this.handlePageChange(currentPage - 1, event)} className={classNames(
                            "Table__Controls__Pagination__Control",
                            {
                                "Table__Controls__Pagination__Control--Disabled": loading || currentPage <= 1,
                            },
                        )}>
                            <Icon icon="arrow-left" />
                        </div>
                        <div className="Table__Controls__Pagination__Page">
                            {currentPage}
                        </div>
                        <div onClick={event => this.handlePageChange(currentPage + 1, event)} className={classNames(
                            "Table__Controls__Pagination__Control",
                            {
                                "Table__Controls__Pagination__Control--Disabled": loading || !data || data.length === 0,
                            },
                        )}>
                            <Icon icon="arrow-right" />
                        </div>
                    </div>
                </div>}
            </Panel>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    configuration: PropTypes.array.isRequired,
    keyAccessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    metadata: PropTypes.object,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    currentPage: PropTypes.number,
    maximumPages: PropTypes.number,
    onPageChange: PropTypes.func,
    perPage: PropTypes.number,
    minWidth: PropTypes.number,
    onPerPageChange: PropTypes.func,
    className: PropTypes.string,
    headClassName: PropTypes.string,
    rowClassName: PropTypes.string,
    groupBy: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    groupingConfiguration: PropTypes.array,
    emptyStateLabel: PropTypes.string,
};

Table.defaultProps = {
    onPageChange: () => {},
    onPerPageChange: () => {},
    metadata: {},
    emptyStateLabel: "No results",
};

export default Table;
