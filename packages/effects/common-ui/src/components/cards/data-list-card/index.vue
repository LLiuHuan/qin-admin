<!-- 数据列表卡片 -->
<script setup lang="ts">
import type { DataListProps } from '../types';

import { computed } from 'vue';

import { IconifyIcon } from '@qin/icons';

import { QinButton, QinScrollbar } from '@qin-core/shadcn-ui';

defineOptions({ name: 'DataListCard' });
const props = withDefaults(defineProps<DataListProps>(), {
  maxCount: 5,
});
const emit = defineEmits<{
  /** 点击更多按钮事件 */
  (e: 'more'): void;
}>();

const maxHeight = computed(() => `${66 * props.maxCount}px`);

const handleMore = () => emit('more');
</script>

<template>
  <div class="qin-card p-5">
    <div class="pb-3.5">
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm text-gray-600">{{ subtitle }}</p>
    </div>
    <QinScrollbar :style="{ height: maxHeight }" shadow shadow-border>
      <div v-for="(item, index) in list" :key="index" class="flex-yc py-3">
        <div
          v-if="item.icon"
          class="flex-cc mr-3 size-10 rounded-lg"
          :class="item.class"
        >
          <IconifyIcon :icon="item.icon" class="text-xl" />
        </div>
        <div class="flex-1">
          <div class="mb-1 text-sm">{{ item.title }}</div>
          <div class="text-xs text-gray-500">{{ item.status }}</div>
        </div>
        <div class="ml-3 text-xs text-gray-500">{{ item.time }}</div>
      </div>
    </QinScrollbar>
    <QinButton
      class="mt-[25px] w-full text-center"
      v-if="showMoreButton"
      v-ripple
      @click="handleMore"
    >
      查看更多
    </QinButton>
  </div>
</template>
