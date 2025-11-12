<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:47:53
 * @LastEditTime: 2025-08-18 10:09:22
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed, useTemplateRef } from 'vue';

import { QinSpineText } from '@qin-core/shadcn-ui';

const props = defineProps<{
  contentStyle: CSSProperties;
  isPassing: boolean;
  successText: string;
  text: string;
}>();

const contentRef = useTemplateRef<HTMLDivElement>('contentRef');

const style = computed(() => {
  const { contentStyle } = props;

  return {
    ...contentStyle,
  };
});

defineExpose({
  getEl: () => {
    return contentRef.value;
  },
});
</script>

<template>
  <div
    ref="contentRef"
    :class="{
      [$style.success]: isPassing,
      success: isPassing,
    }"
    :style="style"
    class="absolute top-0 flex size-full select-none items-center justify-center text-xs"
  >
    <slot name="text">
      <QinSpineText class="flex h-full items-center">
        {{ isPassing ? successText : text }}
      </QinSpineText>
    </slot>
  </div>
</template>

<style module>
.success {
  -webkit-text-fill-color: hsl(0deg 0% 98%);
}
</style>
