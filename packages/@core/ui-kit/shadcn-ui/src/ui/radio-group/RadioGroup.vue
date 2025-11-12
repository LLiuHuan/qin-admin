<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-17 00:55:16
 * @LastEditTime: 2025-07-02 10:46:15
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<RadioGroupRootProps & { class?: any }>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="forwarded">
    <slot></slot>
  </RadioGroupRoot>
</template>
