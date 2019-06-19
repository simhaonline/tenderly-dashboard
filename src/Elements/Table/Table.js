import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Panel, Icon} from "../index";

import './Table.scss';

class TableColumn extends Component {
    render() {
        const {configuration, data, metadata} = this.props;

        return (
            <div className={classNames(
                "Table__Column",
                "Table__Column--Body",
                configuration.className,
            )}>
                {!!configuration.renderColumn && configuration.renderColumn(data, metadata)}
                {!configuration.renderColumn && data[configuration.accessor]}
            </div>
        )
    }
}

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

    render() {
        const {configuration, data, className, rowClassName, headClassName, currentPage, perPage, onPageChange, onPerPageChange, onRowClick} = this.props;

        return (
            <Panel className={classNames(
                "Table",
                className,
            )}>
                <div className={classNames(
                    "Table__Head",
                    headClassName,
                )}>
                    {configuration.map((conf, index) => (
                        <div key={index} className={classNames(
                            "Table__Column",
                            "Table__Column--Head",
                            configuration.className,
                        )}>
                            {conf.label}
                        </div>
                    ))}
                </div>
                <div className={classNames(
                    "Table__Body",
                )}>
                    {data.map((row, index) => <div key={this.getKeyAccessor(row, index)} className={classNames(
                        "Table__Row",
                        rowClassName,
                        {
                            "Table__Row--Even": !!(index % 2),
                            "Table__Row--Clickable": !!onRowClick,
                        },
                    )} onClick={this.handleRowClick}>
                        {configuration.map((conf, index) => <TableColumn key={index} configuration={conf} data={row}/>)}
                    </div>)}
                </div>
                {currentPage && <div className={"Table__Controls"}>
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
                        <Icon icon="arrow-left" onClick={event => onPageChange(currentPage - 1, event)}/>
                        {currentPage}
                        <Icon icon="arrow-right" onClick={event => onPageChange(currentPage + 1, event)}/>
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
    onPerPageChange: PropTypes.func,
    className: PropTypes.string,
    headClassName: PropTypes.string,
    rowClassName: PropTypes.string,
};

Table.defaultProps = {
    onPageChange: () => {},
    onPerPageChange: () => {},
};

export default Table;
