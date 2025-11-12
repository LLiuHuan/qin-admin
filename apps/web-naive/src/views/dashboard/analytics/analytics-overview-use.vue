<script lang="ts" setup>
import { useEcharts } from '@qin/plugins/echarts';

const { domRef: chartRef } = useEcharts(() => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    legend: {
      show: true,
      top: 'center',
      right: '0',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: '总计',
        type: 'pie',
        radius: ['50%', '70%'],
        label: {
          show: false,
        },
        data: [
          { value: 1024, name: '微信' },
          { value: 1024, name: '抖音' },
          { value: 1024, name: '知乎' },
        ],
      },
    ],
  };
});
</script>

<template>
  <div ref="chartRef" class="h-70px w-120px"></div>
</template>
