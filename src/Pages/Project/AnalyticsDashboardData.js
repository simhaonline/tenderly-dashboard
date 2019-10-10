import moment from "moment";

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
        {date: moment('2019-09-06'), successful: 21, failed: 3,},
        {date: moment('2019-09-07'), successful: 21, failed: 3,},
        {date: moment('2019-09-08'), successful: 22, failed: 3,},
        {date: moment('2019-09-09'), successful: 25, failed: 3,},
        {date: moment('2019-09-11'), successful: 26, failed: 3,},
        {date: moment('2019-09-12'), successful: 27, failed: 3,},
        {date: moment('2019-09-13'), successful: 28, failed: 3,},
        {date: moment('2019-09-14'), successful: 29, failed: 3,},
        {date: moment('2019-09-15'), successful: 28, failed: 3,},
        {date: moment('2019-09-16'), successful: 29, failed: 3,},
        {date: moment('2019-09-17'), successful: 21, failed: 3,},
        {date: moment('2019-09-18'), successful: 21, failed: 3,},
        {date: moment('2019-09-19'), successful: 22, failed: 3,},
        {date: moment('2019-09-20'), successful: 25, failed: 3,},
        {date: moment('2019-09-21'), successful: 26, failed: 3,},
        {date: moment('2019-09-22'), successful: 27, failed: 3,},
        {date: moment('2019-09-23'), successful: 28, failed: 3,},
        {date: moment('2019-09-24'), successful: 29, failed: 3,},
        {date: moment('2019-09-25'), successful: 28, failed: 3,},
        {date: moment('2019-09-26'), successful: 29, failed: 3,},
        {date: moment('2019-09-27'), successful: 21, failed: 3,},
        {date: moment('2019-09-28'), successful: 21, failed: 3,},
        {date: moment('2019-09-29'), successful: 22, failed: 3,},
        {date: moment('2019-09-30'), successful: 25, failed: 3,},
        {date: moment('2019-10-08'), successful: 26, failed: 3,},
        {date: moment('2019-10-09'), successful: 27, failed: 3,},
        {date: moment('2019-10-10'), successful: 28, failed: 3,},
        {date: moment('2019-10-08'), successful: 29, failed: 3,},
        {date: moment('2019-10-09'), successful: 28, failed: 3,},
        {date: moment('2019-10-10'), successful: 29, failed: 3,},
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
        {name: "trade()", percentage: 50.8, calls: 12,},
        {name: "tradeWithHint()", percentage: 50.8, calls: 12,},
        {name: "add()", percentage: 50.8, calls: 12,},
        {name: "sub()", percentage: 50.8, calls: 12,},
        {name: "trade()", percentage: 50.8, calls: 12,},
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
        {name: "Transfer", percentage: 50.8, calls: 12,},
        {name: "TokenTransfer", percentage: 50.8, calls: 12,},
        {name: "ProxyListen", percentage: 50.8, calls: 12,},
        {name: "Approval", percentage: 50.8, calls: 12,},
        {name: "EtherReceival", percentage: 50.8, calls: 12,},
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
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
        {address: "0x1238128381283818283182aqweq1238q", calls: 12,},
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
        {date: moment('2019-09-24'), cost: [254012, 291435],},
        {date: moment('2019-09-25'), cost: [254012, 291435],},
        {date: moment('2019-09-26'), cost: [254012, 291435],},
        {date: moment('2019-09-27'), cost: [254012, 291435],},
        {date: moment('2019-09-28'), cost: [254012, 291435],},
        {date: moment('2019-09-29'), cost: [254012, 291435],},
        {date: moment('2019-09-30'), cost: [254012, 548301],},
        {date: moment('2019-10-08'), cost: [254012, 291435],},
        {date: moment('2019-10-09'), cost: [254012, 291435],},
        {date: moment('2019-10-10'), cost: [254012, 291435],},
        {date: moment('2019-10-08'), cost: [254012, 291435],},
        {date: moment('2019-10-09'), cost: [254012, 291435],},
        {date: moment('2019-10-10'), cost: [254012, 291435],},
        {date: moment('2019-10-11'), cost: [254012, 291435],},
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
