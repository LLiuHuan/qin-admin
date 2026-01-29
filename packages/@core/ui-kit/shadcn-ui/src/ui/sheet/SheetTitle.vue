<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2026-01-23 15:21:20
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { DialogTitle } from 'reka-ui';

const props = defineProps<DialogTitleProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogTitle
    :class="cn('text-foreground mr-2 text-xl font-medium', props.class)"
    v-bind="delegatedProps"
  >
    <slot></slot>
  </DialogTitle>
</template>
