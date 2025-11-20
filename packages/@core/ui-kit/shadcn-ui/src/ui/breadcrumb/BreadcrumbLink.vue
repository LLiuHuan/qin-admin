<!--
 * @Description: 面包屑Link组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:55:01
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui';

import { cn } from '@qin-core/shared/utils';

import { Primitive } from 'reka-ui';

const props = withDefaults(defineProps<PrimitiveProps & { class?: any }>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('hover:text-foreground transition-colors', props.class)"
  >
    <slot></slot>
  </Primitive>
</template>
