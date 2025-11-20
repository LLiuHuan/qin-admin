<!--
 * @Description: 卡片头部组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:58:32
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <div :class="cn('flex flex-col gap-y-1.5 p-5', props.class)">
    <slot></slot>
  </div>
</template>
