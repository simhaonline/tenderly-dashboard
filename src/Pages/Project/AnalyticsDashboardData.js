import moment from "moment";
import _ from 'lodash';

import {
  AnalyticsWidgetDataRangeTypes,
  AnalyticsWidgetListTypeColumnTypes,
  AnalyticsWidgetSizeTypes,
  AnalyticsWidgetTypes
} from "../../Common/constants";

const data = {
  name: "MyToken Metrics",
  widgets: [
    {
      id: "graph1",
      name: "Transactions",
      type: AnalyticsWidgetTypes.LINE_CHART,
      size: AnalyticsWidgetSizeTypes.TWO,
      lastDataSync: new Date(),
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_30_DAYS,
      alerts: [
          'dasqw',
          'qweeqwe'
      ],
      dataPoints: [
        {
          key: 'successful',
          name: 'Successful Tx',
          color: '#0076FF',
        },
        {
          key: 'failed',
          name: 'Failed Tx',
          color: '#ffb81f',
        },
      ],
      data: [
        {date: moment('2019-09-06'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-07'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-08'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-09'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-11'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-12'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-13'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-14'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-15'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-16'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-17'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-18'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-19'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-20'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-21'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-22'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-23'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-24'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-25'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-26'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-27'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-28'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-29'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-09-30'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-08'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-09'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-10'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-08'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-09'), successful: _.random(47, 72), failed: _.random(4, 11),},
        {date: moment('2019-10-10'), successful: _.random(47, 72), failed: _.random(4, 11),},
      ],
    },
    {
      id: 'graph2',
      name: 'Top Function Calls',
      size: AnalyticsWidgetSizeTypes.TWO,
      type: AnalyticsWidgetTypes.LIST,
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_30_DAYS,
      dataPoints: [
        {
          key: 'name',
          name: 'Function Name',
          size: 3,
          type: AnalyticsWidgetListTypeColumnTypes.VALUE,
        },
        {
          key: 'percentage',
          name: 'Percentage',
          size: 2,
          type: AnalyticsWidgetListTypeColumnTypes.BAR,
        },
        {
          key: 'calls',
          name: 'Count',
          size: 1,
          type: AnalyticsWidgetListTypeColumnTypes.COUNT,
        },
      ],
      data: [
        {name: "trade()", percentage: 32.2, calls: 104,},
        {name: "tradeWithHint()", percentage: 30.34, calls: 98,},
        {name: "startVote()", percentage: 9.91, calls: 32,},
        {name: "approve()", percentage: 7.43, calls: 24,},
        {name: "arbitrage()", percentage: 1.86, calls: 6,},
      ],
    },
    {
      id: 'graph3',
      name: 'Top Events Emitted',
      size: AnalyticsWidgetSizeTypes.TWO,
      type: AnalyticsWidgetTypes.LIST,
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_30_DAYS,
      dataPoints: [
        {
          key: 'name',
          name: 'Event',
          size: 3,
          type: AnalyticsWidgetListTypeColumnTypes.VALUE,
        },
        {
          key: 'percentage',
          name: 'Percentage',
          size: 2,
          type: AnalyticsWidgetListTypeColumnTypes.BAR,
        },
        {
          key: 'calls',
          name: 'Count',
          size: 1,
          type: AnalyticsWidgetListTypeColumnTypes.COUNT,
        },
      ],
      data: [
        {name: "Transfer", percentage: 41.6, calls: 57,},
        {name: "TokenTransfer", percentage: 23.35, calls: 32,},
        {name: "Vote", percentage: 7.3, calls: 10,},
        {name: "Approval", percentage: 5.11, calls: 7,},
        {name: "EtherReceival", percentage: 5.11, calls: 7,},
      ],
    },
    {
      id: 'graph4',
      name: 'Top 10 Caller Addresses',
      size: AnalyticsWidgetSizeTypes.TWO,
      type: AnalyticsWidgetTypes.LIST,
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_30_DAYS,
      dataPoints: [
        {
          key: 'address',
          name: 'Caller Address',
          size: 4,
          type: AnalyticsWidgetListTypeColumnTypes.VALUE,
        },
        {
          key: 'calls',
          name: 'Calls',
          size: 1,
          type: AnalyticsWidgetListTypeColumnTypes.COUNT,
        },
      ],
      data: [
        {address: "0x81d1a81adb3f6e24ae48faa32137c3c9601e11f7", calls: 27,},
        {address: "0x81d597c54f6b9c7f80641d3732685278c7461fe9", calls: 12,},
        {address: "0x81dd841c5cb15657b9ead7279a6b9c650675fe09", calls: 12,},
        {address: "0x81f4c39f36a043c262965ffe0490be363aae2114", calls: 10,},
        {address: "0x81fad936aae5d6d7f08834ae54385e080bfd050c", calls: 4,},
        {address: "0x81fc8ab6c8c2be4eaeebf33b3fc115746f4d01db", calls: 2,},
        {address: "0x820a4875aa7900995d6f4ed84ab66651dd582aef", calls: 2,},
        {address: "0x8220fd1e4bc7b4a7af18f993a7fc702e7186601b", calls: 1,},
        {address: "0x8226b85090db834f77fc57545fbe10ebb332b21f", calls: 1,},
        {address: "0x8226ef999470c505979192e0e0a0bc73066bfa05", calls: 1,},
      ],
    },
    {
      id: 'graph5',
      name: "Gas Cost Deviation",
      size: AnalyticsWidgetSizeTypes.FOUR,
      type: AnalyticsWidgetTypes.BAR_CHART,
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_14_DAYS,
      dataPoints: [
        {
          key: 'cost',
          name: 'Gas Cost',
          color: '#0076FF',
        },
      ],
      data: [
        {date: moment('2019-09-17'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-18'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-19'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-20'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-21'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-22'), cost: [_.random(294156, 311545), _.random(345915, 389515)],},
        {date: moment('2019-09-23'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-24'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-25'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-26'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-27'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-28'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-29'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-09-30'), cost: [279145, 548301],},
        {date: moment('2019-10-08'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-09'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-10'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-08'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-09'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-10'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
        {date: moment('2019-10-11'), cost: [_.random(234012, 279145), _.random(281125, 295478)],},
      ],
    },
    {
      id: 'graph6',
      name: 'Average Tx cost breakdown',
      size: AnalyticsWidgetSizeTypes.THREE,
      type: AnalyticsWidgetTypes.LIST,
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_30_DAYS,
      dataPoints: [
        {
          key: 'name',
          name: 'Function',
          size: 4,
          type: AnalyticsWidgetListTypeColumnTypes.VALUE,
        },
        {
          key: 'avgCost',
          name: 'Average cost',
          size: 2,
          type: AnalyticsWidgetListTypeColumnTypes.VALUE,
        },
        {
          key: 'percentage',
          name: 'Percent',
          size: 3,
          type: AnalyticsWidgetListTypeColumnTypes.BAR,
        },
        {
          key: 'called',
          name: 'Invocations',
          size: 1,
          type: AnalyticsWidgetListTypeColumnTypes.COUNT,
        },
      ],
      data: [
        {name: "sub()", avgCost: 54109, percentage: 50.8, called: 6,},
        {name: "div()", avgCost: 54109, percentage: 10.74, called: 6,},
        {name: "transferFrom()", avgCost: 54109, percentage: 10.4, called: 6,},
        {name: "mint()", avgCost: 54109, percentage: 4.31, called: 6,},
        {name: "transfer()", avgCost: 54109, percentage: 4.11, called: 6,},
        {name: "ProxyContract.transfer()", avgCost: 54109, percentage: 3.2, called: 6,},
      ],
    },
  ],
};

export default data;
