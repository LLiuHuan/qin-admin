<!--
 * @Description: 卡片组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:57:27
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'bg-card text-card-foreground border-border rounded-xl border',
        props.class,
      )
    "
  >
    <slot></slot>
  </div>
</template>
