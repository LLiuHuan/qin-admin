<!--
 * @Description: 面包屑Item组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:55:19
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <li
    :class="
      cn('hover:text-foreground inline-flex items-center gap-1.5', props.class)
    "
  >
    <slot></slot>
  </li>
</template>
