<!-- 统计卡片 -->
<script setup lang="ts">
import type { StatsCardProps } from '../types';

import { IconifyIcon } from '@qin/icons';

import { CountTo } from '../../count-to';

defineOptions({ name: 'StatsCard' });

withDefaults(defineProps<StatsCardProps>(), {
  iconSize: 30,
  iconBgRadius: 50,
  decimals: 0,
  separator: ',',
});
</script>

<template>
  <div
    class="qin-card flex-y-c h-32 px-5 transition-transform duration-200 hover:-translate-y-0.5"
    :class="boxStyle"
  >
    <div
      v-if="icon"
      class="flex-cc mr-4 size-11 rounded-lg text-xl text-white"
      :class="iconStyle"
    >
      <IconifyIcon :icon="icon" />
    </div>
    <div class="flex-1">
      <p
        class="m-0 text-lg font-medium"
        :style="{ color: textColor }"
        v-if="title"
      >
        {{ title }}
      </p>
      <CountTo
        main-class="m-0 text-2xl font-medium"
        v-if="count !== undefined"
        :end-val="count"
        :duration="2000"
        :decimals="decimals"
        :separator="separator"
      />
      <p
        class="mt-1 text-sm text-gray-500 opacity-90"
        :style="{ color: textColor }"
        v-if="description"
      >
        {{ description }}
      </p>
    </div>
    <div v-if="showArrow">
      <IconifyIcon icon="ri:arrow-right-s-line" class="text-g-500 text-xl" />
    </div>
  </div>
</template>
