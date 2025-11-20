<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:18:16
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { TabsIndicatorProps } from 'reka-ui';

import { computed, reactive } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { TabsIndicator, useForwardProps } from 'reka-ui';

const props = defineProps<TabsIndicatorProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return reactive(delegated);
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsIndicator
    :class="
      cn(
        'absolute bottom-0 left-0 z-10 h-full w-1/2 translate-x-[--reka-tabs-indicator-position] rounded-full px-0 py-1 pr-0.5 transition-[width,transform] duration-300',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <div
      class="bg-background text-foreground focus-visible:outline-hidden inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <slot></slot>
    </div>
  </TabsIndicator>
</template>
