<!-- 卡片横幅组件 -->
<script setup lang="ts">
// 导入默认图标
// import defaultIcon from '@imgs/3d/icon1.webp';
import type { CardBannerProps } from '../types';

import { Button } from '@qin-core/shadcn-ui';

defineOptions({ name: 'QinCardBanner' });

// 定义组件属性默认值
withDefaults(defineProps<CardBannerProps>(), {
  height: '24rem',
  image: 'https://unpkg.com/arco-static@0.0.6/source/3d-icon1.webp',
  title: '',
  description: '',
  // 主按钮默认配置
  button: () => ({
    show: true,
    text: '查看详情',
    color: 'hsl(var(--primary))',
    textColor: '#fff',
  }),
  // 取消按钮默认配置
  cancelButton: () => ({
    show: false,
    text: '取消',
    color: '#f5f5f5',
    textColor: '#666',
  }),
});

// 定义组件事件
const emit = defineEmits<{
  (e: 'click'): void; // 主按钮点击事件
  (e: 'cancel'): void; // 取消按钮点击事件
}>();

// 主按钮点击处理函数
const handleClick = () => {
  emit('click');
};

// 取消按钮点击处理函数
const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div
    class="qin-card-sm flex flex-col items-center justify-center"
    :style="{ height }"
  >
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="w-45">
        <img :src="image" :alt="title" class="h-full w-full object-contain" />
      </div>
      <div class="box-border px-4">
        <p class="text-g-800 mb-2 text-lg font-semibold">{{ title }}</p>
        <p class="text-g-600 m-0 text-sm">{{ description }}</p>
      </div>
      <div class="flex items-center gap-3">
        <Button
          v-if="cancelButton?.show"
          class="pointer border-g-300 inline-block h-9 select-none rounded-md border px-3 text-sm/9 !leading-none"
          :style="{
            backgroundColor: cancelButton?.color,
            color: cancelButton?.textColor,
          }"
          @click="handleCancel"
        >
          {{ cancelButton?.text }}
        </Button>
        <Button
          v-if="button?.show"
          class="pointer inline-block h-9 select-none rounded-md px-3 text-sm/9 !leading-none"
          :style="{ backgroundColor: button?.color, color: button?.textColor }"
          @click="handleClick"
        >
          {{ button?.text }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qin-card-sm {
  background: hsl(var(--background));
  border: 1px solid var(--border) !important;
  border-radius: var(--radius) !important;
  box-shadow: none !important;
}
</style>
