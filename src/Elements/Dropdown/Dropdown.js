import React, {Component, useContext} from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import './Dropdown.scss';

const DropdownContext = React.createContext({
    open: false,
    toggleDropdown: () => {},
    closeDropdown: () => {},
});

export const DropdownToggle = ({children}) => {
    const context = useContext(DropdownContext);

    return (
        <div className="Dropdown__Toggle" onClick={context.toggleDropdown}>
            {children}
        </div>
    )
};

export const DropdownMenu = ({children}) => {
    const context = useContext(DropdownContext);

    if (!context.open) {
        return null;
    }

    return (
        <div className={classNames(
            "Dropdown__Menu",
            {
                "Dropdown__Menu--Closing": context.closing,
            },
        )}>
            {children}
        </div>
    )
};

export const DropdownItem = ({children, onClick = () => {}}) => {
    const context = useContext(DropdownContext);

    const handleClick = (event) => {
        onClick(event);
        context.closeDropdown();
    };

    return (
        <div className="Dropdown__Item" onClick={handleClick}>
            {children}
        </div>
    )
};

class Dropdown extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            closing: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    handleDropdownToggle = () => {
        if (this.state.open) {
            this.handleDropdownClose();

            return;
        }

        this.setState({
            open: true,
        });
    };

    handleDropdownClose = () => {
        if (!this.state.open) {
            return;
        }

        this.setState({
            closing: true,
            closingCallback: setTimeout(() => {
                if (!this._isMounted) {
                    return;
                }

                this.setState({
                    open: false,
                    closing: false,
                    closingCallback: null,
                });
            }, 150),
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {children} = this.props;
        const {open, closing} = this.state;

        return (
            <DropdownContext.Provider value={{
                toggleDropdown: this.handleDropdownToggle,
                closeDropdown: this.handleDropdownClose,
                open,
                closing,
            }}>
                <div className="Dropdown" onClick={event => event.stopPropagation()}>
                    <OutsideClickHandler onOutsideClick={this.handleDropdownClose}>
                        {children}
                    </OutsideClickHandler>
                </div>
            </DropdownContext.Provider>
        );
    }
}

export default Dropdown;
