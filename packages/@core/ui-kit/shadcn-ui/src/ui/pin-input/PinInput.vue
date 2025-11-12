<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-08-12 16:28:37
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { PinInputRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<
  PinInputRootProps<'number' | 'text'> & { class?: any }
>();
const emits = defineEmits<PinInputRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <PinInputRoot
    v-bind="forwarded"
    :class="cn('flex items-center gap-2', props.class)"
  >
    <slot></slot>
  </PinInputRoot>
</template>
