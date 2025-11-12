<!--
 * @Description: 菜单子项触发组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:05:32
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { ChevronRight } from 'lucide-vue-next';
import { ContextMenuSubTrigger, useForwardProps } from 'reka-ui';

const props = defineProps<
  ContextMenuSubTriggerProps & {
    class?: any;
    inset?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot></slot>
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
