<!-- 时间轴列表卡片 -->
<script setup lang="ts">
import type { TimelineProps } from '../types';

import { computed } from 'vue';

import { QinScrollbar } from '@qin-core/shadcn-ui';

defineOptions({ name: 'TimelineListCard' });

// Props 定义和验证
const props = withDefaults(defineProps<TimelineProps>(), {
  title: '',
  subtitle: '',
  maxCount: 5,
});

// 计算最大高度
const maxHeight = computed(() => `${65 * props.maxCount}px`);
</script>

<template>
  <div class="qin-card p-5">
    <div class="pb-3.5">
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm text-gray-600">{{ subtitle }}</p>
    </div>
    <QinScrollbar :style="{ height: maxHeight }">
      <slot></slot>
    </QinScrollbar>
  </div>
</template>
