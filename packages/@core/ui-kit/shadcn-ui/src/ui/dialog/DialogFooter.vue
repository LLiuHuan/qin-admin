<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:07:50
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{ class?: any }>();
</script>

<template>
  <div
    :class="
      cn('flex flex-row flex-col-reverse justify-end gap-x-2', props.class)
    "
  >
    <slot></slot>
  </div>
</template>
