<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-07-24 10:11:13
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useEcharts } from '@qin/plugins/echarts';

const { domRef: chartRef } = useEcharts(() => {
  return {
    grid: {
      bottom: 0,
      left: '1%',
      right: '1%',
      top: '2 %',
    },
    series: [
      {
        barMaxWidth: 80,
        // color: '#4f69fd',
        data: [
          3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000,
          3200,
        ],
        type: 'bar',
      },
    ],
    tooltip: {
      axisPointer: {
        lineStyle: {
          // color: '#4f69fd',
          width: 1,
        },
      },
      trigger: 'axis',
    },
    xAxis: {
      data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`),
      type: 'category',
    },
    yAxis: {
      max: 8000,
      splitNumber: 4,
      type: 'value',
    },
  };
});
</script>

<template>
  <div ref="chartRef" class="h-300px"></div>
</template>
