<!-- 环型图卡片 -->
<script setup lang="ts">
import type { DonutProps } from '../types';

import { useTemplateRef } from 'vue';

import { useEcharts } from '@qin/plugins/echarts';

import { getCssVar } from '@qin-core/shared/color';

defineOptions({ name: 'ArtDonutChartCard' });

const props = withDefaults(defineProps<DonutProps>(), {
  height: 9,
  radius: () => ['70%', '90%'],
  data: () => [0, 0],
});

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const computedColor = props.color || `hsl(${getCssVar('--primary')})`;
// 使用新的图表组件抽象
useEcharts(useTemplateRef('chartRef'), () => {
  return {
    series: [
      {
        type: 'pie',
        radius: props.radius,
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          {
            value: props.data[0],
            name: props.currentValue,
            itemStyle: { color: computedColor },
          },
          {
            value: props.data[1],
            name: props.previousValue,
            itemStyle: { color: '#e6e8f7' },
          },
        ],
      },
    ],
  };
});
</script>

<template>
  <div class="qin-card overflow-hidden" :style="{ height: `${height}rem` }">
    <div class="box-border flex h-full p-5 pr-2">
      <div class="flex w-full items-start gap-5">
        <div class="flex-b h-full flex-1 flex-col">
          <p class="m-0 text-xl font-medium leading-tight text-gray-900">
            {{ title }}
          </p>
          <div>
            <p
              class="m-0 mt-2.5 text-xl font-medium leading-tight text-gray-900"
            >
              {{ formatNumber(value) }}
            </p>
            <div
              class="mt-1.5 text-xs font-medium"
              :class="
                percentage > 0
                  ? 'text-[hsl(var(--success))]'
                  : 'text-[hsl(var(--destructive))]'
              "
            >
              {{ percentage > 0 ? '+' : '' }}{{ percentage }}%
              <span v-if="percentageLabel">{{ percentageLabel }}</span>
            </div>
          </div>
          <div class="mt-2 flex gap-4 text-xs text-gray-600">
            <div v-if="currentValue" class="flex-cc">
              <div class="mr-2 size-2 rounded bg-[hsl(var(--primary))]"></div>
              {{ currentValue }}
            </div>
            <div v-if="previousValue" class="flex-cc">
              <div class="mr-2 size-2 rounded bg-gray-400"></div>
              {{ previousValue }}
            </div>
          </div>
        </div>
        <div class="flex-y-c h-full max-w-40 flex-1">
          <div ref="chartRef" class="h-30 w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
