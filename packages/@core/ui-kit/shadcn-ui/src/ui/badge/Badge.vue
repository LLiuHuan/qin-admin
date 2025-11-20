<!--
 * @Description: 徽章组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:51:54
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { BadgeVariants } from './badge';

import { cn } from '@qin-core/shared/utils';

import { badgeVariants } from './badge';

const props = defineProps<{
  class?: any;
  variant?: BadgeVariants['variant'];
}>();
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot></slot>
  </div>
</template>
