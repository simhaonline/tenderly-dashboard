import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {components} from "react-select";
import classNames from 'classnames';
import Blockies from "react-blockies";

import {NetworkLabelMap} from "../../Common/constants";

import {Contract} from "../../Core/models";

import {Icon, Select} from "../../Elements";

import './AlertRuleTargetSelect.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

const RequiredContractAlertTypes = [
    'method_call',
    'log_emitted',
];

function AlertTargetSelectOption(props) {
    const {data} = props;

    return (
        <components.Option {...props} className="AlertTargetSelectOption">
            <div className={classNames(
                "AlertTargetSelectOption__IconWrapper",
                `AlertTargetSelectOption__IconWrapper--${data.value}`,
            )}>
                {data.type === 'project' && <Icon icon="project"/>}
                {data.type === 'network' && <Icon icon="layers"/>}
                {data.type === 'contract' && <Blockies
                    seed={data.value}
                    size={8}
                    scale={4}
                    className="AlertTargetSelectOption__IconWrapper__Blockie"
                />}
            </div>
            <div className="AlertTargetSelectOption__Info">
                <div className="AlertTargetSelectOption__Label">{data.label}</div>
                <div className="AlertTargetSelectOption__Description">
                    {data.type === 'contract' && <span className="LinkText MonospaceFont">{generateShortAddress(data.description, 12, 6)}</span>}
                    {data.type !== 'contract' && <span className="MutedText">{data.description}</span>}
                </div>
            </div>
        </components.Option>
    );
}

function AlertRuleTargetSelect({value, onChange, contracts, alertType}) {
    const contractRequired = RequiredContractAlertTypes.includes(alertType.value);

    const options = [{
        label: 'Contracts',
        value: 'contracts',
        options: contracts.map(contract => ({
            type: 'contract',
            label: contract.name,
            value: contract.getUniqueId(),
            description: contract.address,
        })),
    }];

    if (!contractRequired) {
        options.unshift({
            label: 'Multiple',
            value: 'multiple',
            options: [
                {
                    type: 'project',
                    label: 'Project',
                    value: 'project',
                    description: 'All contracts in this project',
                },
                ..._.uniqBy(contracts, 'network').map(contract => ({
                    type: 'network',
                    label: NetworkLabelMap[contract.network],
                    value: contract.network,
                    description: `All contracts deployed on ${NetworkLabelMap[contract.network]}`,
                })),
            ]
        });
    }

    return (
        <div className="AlertRuleBuilderInput--AlertTarget AlertRuleBuilderInput">
            <div className="AlertRuleBuilderInput__Label">
                Target
            </div>
            <Select value={value} components={{
                Option: AlertTargetSelectOption,
            }} options={options} onChange={onChange}/>
        </div>
    );
}

AlertRuleTargetSelect.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    alertType: PropTypes.object.isRequired,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default AlertRuleTargetSelect;
