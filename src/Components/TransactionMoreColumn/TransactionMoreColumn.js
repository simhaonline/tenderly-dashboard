import React, {Component} from 'react';

import {Icon} from '../../Elements';

import './TransactionMoreColumn.scss';

class TransactionMoreColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
        };
    }

    handleMoreClick = (event) => {
        event.stopPropagation();

        this.setState({
            showDropdown: !this.state.showDropdown,
        });
    };

    render() {
        const {transaction} = this.props;

        return (
            <div>
                <Icon icon="more-vertical" className="MoreIcon" onClick={this.handleMoreClick}/>
            </div>
        );
    }
}

export default TransactionMoreColumn;
