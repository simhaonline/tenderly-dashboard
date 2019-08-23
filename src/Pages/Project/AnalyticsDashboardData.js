import moment from "moment";

import {AnalyticsWidgetDataRangeTypes, AnalyticsWidgetSizeTypes, AnalyticsWidgetTypes} from "../../Common/constants";

const data = {
  name: "MyToken Metrics",
  widgets: [
    {
      id: "123a",
      name: "Transactions",
      type: AnalyticsWidgetTypes.STACKED_CHART,
      size: AnalyticsWidgetSizeTypes.TWO,
      lastDataSync: new Date(),
      dataRange: AnalyticsWidgetDataRangeTypes.LAST_WEEK,
      alerts: [
          'dasqw',
          'qweeqwe'
      ],
      dataPoints: [
        {
          key: 'successful',
          color: '#0076FF',
        },
        {
          key: 'failed',
          color: '#ffb81f',
        },
      ],
      data: [
        {
          date: moment('2019-08-05'),
          successful: 21,
          failed: 3,
        },
        {
          date: moment('2019-08-06'),
          successful: 22,
          failed: 3,
        },
        {
          date: moment('2019-08-07'),
          successful: 25,
          failed: 3,
        },
        {
          date: moment('2019-08-08'),
          successful: 26,
          failed: 3,
        },
        {
          date: moment('2019-08-09'),
          successful: 27,
          failed: 3,
        },
        {
          date: moment('2019-08-10'),
          successful: 28,
          failed: 3,
        },
        {
          date: moment('2019-08-11'),
          successful: 29,
          failed: 3,
        },
      ],
    },
    {
      id: 'qwe2',
      name: 'metric',
      size: AnalyticsWidgetSizeTypes.TWO,
    },
    {
      id: '12331q',
      name: 'Most Used Functions',
      size: AnalyticsWidgetSizeTypes.THREE,
      type: AnalyticsWidgetTypes.BAR_CHART,
      data: [
        {},
      ],
    },
    {
      id: 'qwe3',
      name: 'metric',
      size: AnalyticsWidgetSizeTypes.ONE,
    },
  ],
};

export default data;
