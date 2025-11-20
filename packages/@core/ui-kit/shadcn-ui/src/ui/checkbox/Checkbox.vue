<!--
 * @Description: 复选框组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:59:04
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { Check, Minus } from 'lucide-vue-next';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<
  CheckboxRootProps & { class?: any; indeterminate?: boolean }
>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    :class="
      cn(
        'focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-border hover:border-primary focus-visible:outline-hidden peer h-4 w-4 shrink-0 rounded-sm border transition focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <CheckboxIndicator
      class="flex h-full w-full items-center justify-center text-current"
    >
      <slot>
        <component :is="indeterminate ? Minus : Check" class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
