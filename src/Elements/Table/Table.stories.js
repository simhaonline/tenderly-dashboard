import React from "react";
import {storiesOf} from "@storybook/react";

import Table from "./Table";

const stories = storiesOf('Elements|Table', module);

const StatusColumn = ({status}) => <div>
    {status ? 'Enabled': 'Disabled'}
</div>;

const tableData = [
    {
        address: 'asd',
        status: true,
    },
    {
        address: 'qwe',
        status: false,
    },
];

const tableConf = [
    {
        label: 'Contract Address',
        accessor: 'address',
    },
    {
        label: 'Status',
        renderColumn: data => <StatusColumn status={data.status}/>,
    },
];

stories.add('default', () => (
    <Table data={tableData} configuration={tableConf}/>
));
