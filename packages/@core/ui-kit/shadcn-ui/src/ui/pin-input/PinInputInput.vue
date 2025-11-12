<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:46:02
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { PinInputInputProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { PinInputInput, useForwardProps } from 'reka-ui';

const props = defineProps<PinInputInputProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <PinInputInput
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input bg-background focus:outline-hidden relative flex h-10 w-8 items-center justify-center border-y border-r text-center text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:relative focus:z-10 focus:ring-2 md:w-10',
        props.class,
      )
    "
  />
</template>
