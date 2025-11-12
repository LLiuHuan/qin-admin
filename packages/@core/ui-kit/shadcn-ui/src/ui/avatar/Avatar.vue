<!--
 * @Description: 头像组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:52:21
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AvatarVariants } from './avatar';

import { cn } from '@qin-core/shared/utils';

import { AvatarRoot } from 'reka-ui';

import { avatarVariant } from './avatar';

const props = withDefaults(
  defineProps<{
    class?: any;
    shape?: AvatarVariants['shape'];
    size?: AvatarVariants['size'];
  }>(),
  {
    shape: 'circle',
    size: 'sm',
  },
);
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot></slot>
  </AvatarRoot>
</template>
