<!-- 折线图卡片 -->
<script setup lang="ts">
import type { LineChartProps } from '../types';

import { useTemplateRef } from 'vue';

import { graphic, useEcharts } from '@qin/plugins/echarts';

import { getCssVar, getTinyColor } from '@qin-core/shared/color';

defineOptions({ name: 'LineChartCard' });

const props = withDefaults(defineProps<LineChartProps>(), {
  height: 11,
});

const hexToRgba = (color: string, alpha: number) => {
  return getTinyColor(color).setAlpha(alpha).toRgbString();
};

const computedColor = props.color || `hsl(${getCssVar('--primary')})`;

useEcharts(useTemplateRef('chartRef'), () => {
  return {
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: props.chartData,
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: computedColor,
        },
        areaStyle: props.showAreaColor
          ? {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: props.color
                    ? hexToRgba(props.color, 0.2)
                    : hexToRgba(`hsl(${getCssVar('--primary')})`, 0.2),
                },
                {
                  offset: 1,
                  color: props.color
                    ? hexToRgba(props.color, 0.01)
                    : hexToRgba(`hsl(${getCssVar('--primary')})`, 0.01),
                },
              ]),
            }
          : undefined,
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
    <div class="flex-b mb-2.5 items-start p-5">
      <div>
        <p class="text-2xl font-medium leading-none">
          {{ value }}
        </p>
        <p class="mt-1 text-sm text-gray-500">{{ label }}</p>
      </div>
      <div
        class="text-sm font-medium"
        :class="[
          percentage > 0
            ? 'text-[hsl(var(--success))]'
            : 'text-[hsl(var(--destructive))]',
          isMiniChart ? 'absolute bottom-5' : '',
        ]"
      >
        {{ percentage > 0 ? '+' : '' }}{{ percentage }}%
      </div>
      <div v-if="date" class="absolute bottom-5 right-5 text-xs text-gray-500">
        {{ date }}
      </div>
    </div>
    <div
      ref="chartRef"
      class="absolute bottom-0 left-0 right-0 box-border w-full"
      :class="
        isMiniChart
          ? '!h-15 !w-4/10 !absolute !bottom-auto !left-auto !right-5 !top-5'
          : ''
      "
      :style="{ height: isMiniChart ? '60px' : `calc(${height}rem - 5rem)` }"
    ></div>
  </div>
</template>
