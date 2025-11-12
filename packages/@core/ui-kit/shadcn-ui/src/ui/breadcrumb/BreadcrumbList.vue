<!--
 * @Description: 面包屑List组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:55:36
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <ol
    :class="
      cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
        props.class,
      )
    "
  >
    <slot></slot>
  </ol>
</template>
