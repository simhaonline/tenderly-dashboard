import React, {Component} from 'react';
import {connect} from 'react-redux';
import {areProjectContractsLoaded} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import classNames from "classnames";
import {Select} from "../../Elements";
import {ContractSelectOption, ContractSelectValue} from "../index";
import './ContractSelect.scss'

class ContractSelect extends Component {
    render() {
        const {contracts, className, contractsLoaded, ...props} = this.props;

        return (
            <div className={classNames(
                "ContractSelect",
                {
                    "ContractSelect--Loading": !contractsLoaded,
                },
                className,
            )}>
                <Select className="ContractSelect__Select" options={contracts} getOptionValue={contract => contract.id}
                        getOptionLabel={contract => contract.name} components={{
                    Option: ContractSelectOption,
                    SingleValue: ContractSelectValue,
                    IndicatorSeparator: () => null,
                }} selectLabel='Select contract' {...props}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {project} = ownProps;

    return {
        contracts: getContractsForProject(state, project.id),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContractSelect);
