import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Panel, Icon} from "../index";

import './Table.scss';

class TableColumn extends Component {
    render() {
        const {configuration, data} = this.props;

        return (
            <div className={classNames(
                "Table__Column",
                "Table__Column--Body",
                configuration.className,
            )}>
                {!!configuration.renderColumn && configuration.renderColumn(data)}
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

    render() {
        const {configuration, data, className, rowClassName, headClassName, currentPage, perPage} = this.props;

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
                        }
                    )}>
                        {configuration.map((conf, index) => <TableColumn key={index} configuration={conf} data={row}/>)}
                    </div>)}
                </div>
                {currentPage && <div className={"Table__Controls"}>
                    {!!perPage && <div className="Table__PerPage">
                        {}
                    </div>}
                    <div className="Table__Pagination">
                        <Icon icon="arrow-left"/>
                        {currentPage}
                        <Icon icon="arrow-right"/>
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
    loading: PropTypes.bool,
    currentPage: PropTypes.number,
    maximumPages: PropTypes.number,
    onPageChange: PropTypes.func,
    perPage: PropTypes.number,
    onPerPageChange: PropTypes.func,
    className: PropTypes.string,
    headClassName: PropTypes.string,
    rowClassName: PropTypes.string,
};

export default Table;
