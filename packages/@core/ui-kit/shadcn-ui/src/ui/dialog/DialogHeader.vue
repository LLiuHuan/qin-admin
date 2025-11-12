<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:07:53
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
    :class="cn('flex flex-col gap-y-1.5 text-center sm:text-left', props.class)"
  >
    <slot></slot>
  </div>
</template>
