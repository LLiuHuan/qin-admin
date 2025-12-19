<!-- 柱状图卡片 -->
<script setup lang="ts">
import type { BarChartProps } from '../types';

import { useTemplateRef } from 'vue';

import { useEcharts } from '@qin/plugins/echarts';

import { getCssVar } from '@qin-core/shared/color';

defineOptions({ name: 'BarChartCard' });

const props = withDefaults(defineProps<BarChartProps>(), {
  height: 11,
  barWidth: '26%',
});

const computedColor = props.color || `hsl(${getCssVar('--primary')})`;
// 使用新的图表组件抽象
useEcharts(useTemplateRef('chartRef'), () => {
  return {
    grid: {
      top: 0,
      right: 0,
      bottom: 15,
      left: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: props.chartData,
        type: 'bar',
        barWidth: props.barWidth,
        itemStyle: {
          color: computedColor,
          borderRadius: 2,
        },
      },
    ],
  };
});
</script>

<template>
  <div
    class="qin-card relative overflow-hidden"
    :style="{ height: `${height}rem` }"
  >
    <div class="flex-b mb-5 px-5 pt-5">
      <div>
        <p class="m-0 text-2xl font-medium leading-tight text-gray-900">
          {{ value }}
        </p>
        <p class="mt-1 text-sm text-gray-600">{{ label }}</p>
      </div>
      <div
        class="text-sm font-medium text-[hsl(var(--destructive))]"
        :class="[
          percentage > 0 ? 'text-[hsl(var(--success))]' : '',
          isMiniChart ? 'absolute bottom-5' : '',
        ]"
      >
        {{ percentage > 0 ? '+' : '' }}{{ percentage }}%
      </div>
      <div v-if="date" class="absolute bottom-5 right-5 text-xs text-gray-600">
        {{ date }}
      </div>
    </div>
    <div
      ref="chartRef"
      class="absolute bottom-0 left-0 right-0 mx-auto"
      :class="
        isMiniChart
          ? '!h-15 !w-4/10 !absolute !bottom-auto !left-auto !right-5 !top-5'
          : ''
      "
      :style="{ height: isMiniChart ? '60px' : `calc(${height}rem - 5rem)` }"
    ></div>
  </div>
</template>
