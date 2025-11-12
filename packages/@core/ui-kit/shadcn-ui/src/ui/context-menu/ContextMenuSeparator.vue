<!--
 * @Description: 菜单分割组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:03:56
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuSeparatorProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { ContextMenuSeparator } from 'reka-ui';

const props = defineProps<ContextMenuSeparatorProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ContextMenuSeparator
    v-bind="delegatedProps"
    :class="cn('bg-border -mx-1 my-1 h-px', props.class)"
  />
</template>
