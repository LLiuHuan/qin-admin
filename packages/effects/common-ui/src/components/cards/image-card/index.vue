<!-- 图片卡片 -->
<script setup lang="ts">
import type { ImageProps } from '../types';

import { IconifyIcon } from '@qin/icons';

defineOptions({ name: 'ImageCard' });

const props = withDefaults(defineProps<ImageProps>(), {
  imageUrl: '',
  title: '',
  category: '',
  readTime: '',
  views: 0,
  comments: 0,
  date: '',
});

const emit = defineEmits<{
  (e: 'click', card: ImageProps): void;
}>();

const handleClick = () => {
  emit('click', props);
};
</script>

<template>
  <div class="pointer w-full" @click="handleClick">
    <div class="qin-card overflow-hidden">
      <div class="relative aspect-[16/10] w-full overflow-hidden">
        <div
          class="wh-full relative inline-block overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <img
            :src="props.imageUrl"
            loading="lazy"
            class="wh-full object-cover align-top"
          />
        </div>
        <div
          class="absolute bottom-3.5 right-3.5 rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-600"
          v-if="props.readTime"
        >
          {{ props.readTime }} 阅读
        </div>
      </div>

      <div class="p-4">
        <div
          class="mb-2 inline-block rounded bg-gray-300/70 px-2 py-0.5 text-xs dark:bg-gray-600/70"
          v-if="props.category"
        >
          {{ props.category }}
        </div>
        <p class="m-0 mb-3 text-base font-medium">{{ props.title }}</p>
        <div class="flex-y-c gap-4 text-xs text-slate-400">
          <span class="flex-y-c gap-1" v-if="props.views">
            <IconifyIcon icon="carbon:view" />
            {{ props.views }}
          </span>
          <span class="flex-y-c gap-1" v-if="props.comments">
            <IconifyIcon icon="mdi:chat-outline" />
            {{ props.comments }}
          </span>
          <span>{{ props.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
