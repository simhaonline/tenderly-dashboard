import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Panel from "../Panel/Panel";

import './Table.scss';

class TableColumn extends Component {
    render() {
        const {configuration, data} = this.props;

        return (
            <div className={classNames(
                "TableColumn",
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
        const {configuration, data, className, rowClassName, headClassName} = this.props;

        return (
            <Panel className={classNames(
                "Table",
                className,
            )}>
                <div className={classNames(
                    "TableHead",
                    headClassName,
                )}>
                    {configuration.map((conf, index) => (
                        <div key={index} className={classNames(
                            "TableHeadColumn",
                            configuration.className,
                        )}>
                            {conf.label}
                        </div>
                    ))}
                </div>
                <div className={classNames(
                    "TableBody",
                )}>
                    {data.map((row, index) => <div key={this.getKeyAccessor(row, index)} className={classNames(
                        "TableRow",
                        rowClassName,
                    )}>
                        {configuration.map((conf, index) => <TableColumn key={index} configuration={conf} data={row}/>)}
                    </div>)}
                </div>
                this table thank yu
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
