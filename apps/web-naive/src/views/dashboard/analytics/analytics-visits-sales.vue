<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-11-24 15:28:07
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useEcharts } from '@qin/plugins/echarts';

const { domRef: chartRef } = useEcharts(() => {
  return {
    series: [
      {
        animationDelay() {
          return Math.random() * 400;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [
          { name: '外包', value: 500 },
          { name: '定制', value: 310 },
          { name: '技术支持', value: 274 },
          { name: '远程', value: 400 },
        ].toSorted((a, b) => {
          return a.value - b.value;
        }),
        name: '商业占比',
        radius: '80%',
        roseType: 'radius',
        type: 'pie',
      },
    ],

    tooltip: {
      trigger: 'item',
    },
  };
});
</script>

<template>
  <div ref="chartRef" class="h-300px"></div>
</template>
