<!-- 进度条卡片 -->
<script setup lang="ts">
import type { ProgressProps } from '../types';

import { onMounted, ref, watch } from 'vue';

import { IconifyIcon } from '@qin/icons';

import { QinProgress } from '@qin-core/shadcn-ui';

import { CountTo } from '../../count-to';

defineOptions({ name: 'ProgressCard' });

const props = withDefaults(defineProps<ProgressProps>(), {
  strokeWidth: 2,
  color: '#67C23A',
});

const animationDuration = 500;
const currentPercentage = ref(0);

const animateProgress = () => {
  const startTime = Date.now();
  const startValue = currentPercentage.value;
  const endValue = props.percentage;

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);

    currentPercentage.value = startValue + (endValue - startValue) * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
  animateProgress();
});

// 当 percentage 属性变化时重新执行动画
watch(
  () => props.percentage,
  () => {
    animateProgress();
  },
);
</script>

<template>
  <div class="qin-card flex-x-c h-32 flex-col px-5">
    <div
      class="flex-y-c mb-3.5"
      :style="{ justifyContent: icon ? 'space-between' : 'flex-start' }"
    >
      <div
        v-if="icon"
        class="flex-cc size-11 rounded-lg bg-gray-300 text-xl"
        :class="iconStyle"
      >
        <IconifyIcon :icon="icon" class="text-2xl" />
      </div>
      <div>
        <CountTo
          class="mb-1 block text-2xl font-semibold"
          :end-val="percentage"
          :duration="2000"
          suffix="%"
          :style="{ textAlign: icon ? 'right' : 'left' }"
        />
        <p class="text-sm text-gray-500">{{ title }}</p>
      </div>
    </div>
    <QinProgress
      v-model="currentPercentage"
      :style="{ height: `${strokeWidth / 4}rem` }"
      :indicator-style="{ background: color }"
    />
  </div>
</template>
