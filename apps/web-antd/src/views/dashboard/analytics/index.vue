<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-27 15:41:45
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { TabOption } from '@qin/types';

import { computed } from 'vue';

import {
  AnalysisChartCard,
  AnalysisChartOverview,
  AnalysisChartsTabs,
} from '@qin/common-ui';
import { usePreferences } from '@qin/preferences';

import AnalyticsOverviewDownload from './analytics-overview-download.vue';
import AnalyticsOverviewUse from './analytics-overview-use.vue';
import AnalyticsOverviewUser from './analytics-overview-user.vue';
import AnalyticsOverviewVisit from './analytics-overview-visit.vue';
import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const { isDark } = usePreferences();

const overviewItems = computed(() => {
  return [
    {
      name: 'user',
      title: '用户量',
      totalTitle: '总用户量',
      totalValue: 120_000,
      value: 2000,
      style: {
        background: isDark.value
          ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
          : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
      },
    },
    {
      name: 'visit',
      title: '访问量',
      totalTitle: '总访问量',
      totalValue: 500_000,
      value: 20_000,
      style: {
        background: isDark.value
          ? 'linear-gradient(180deg, #3D492E 0%, #263827 100%)'
          : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
      },
    },
    {
      name: 'download',
      title: '下载量',
      totalTitle: '总下载量',
      totalValue: 120_000,
      value: 8000,
      style: {
        background: isDark.value
          ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
          : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
      },
    },
    {
      name: 'use',
      title: '使用量',
      totalTitle: '总使用量',
      totalValue: 50_000,
      value: 5000,
      style: {
        background: isDark.value
          ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
          : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
      },
    },
  ];
});

const chartTabs: TabOption[] = [
  {
    label: '流量趋势',
    value: 'trends',
  },
  {
    label: '月访问量',
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisChartOverview :items="overviewItems">
      <template #user>
        <AnalyticsOverviewUser />
      </template>
      <template #visit>
        <AnalyticsOverviewVisit />
      </template>
      <template #download>
        <AnalyticsOverviewDownload />
      </template>
      <template #use>
        <AnalyticsOverviewUse />
      </template>
    </AnalysisChartOverview>
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="访问数量">
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>
