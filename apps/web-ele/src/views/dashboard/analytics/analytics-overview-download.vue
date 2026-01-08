<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { useEcharts } from '@qin/plugins/echarts';

useEcharts(useTemplateRef('chartRef'), () => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    series: [
      {
        name: '2001',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#165DFF',
          width: 3,
        },
      },
      {
        name: '2002',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#6AA1FF',
          width: 3,
          type: 'dashed',
        },
      },
    ],
  };
});
</script>

<template>
  <div ref="chartRef" class="h-70px w-120px"></div>
</template>
