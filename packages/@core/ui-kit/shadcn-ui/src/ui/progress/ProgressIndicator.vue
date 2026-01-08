<script setup lang="ts">
import type { ProgressIndicatorProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { ProgressIndicator, useForwardProps } from 'reka-ui';

const props = defineProps<
  ProgressIndicatorProps & { class?: any; modelValue?: null | number }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ProgressIndicator
    v-bind="forwardedProps"
    :class="
      cn(
        'indicator ease-[cubic-bezier(0.65, 0, 0.35, 1)] after-animate-progress after-content-[quoted:123] relative block wh-full overflow-hidden rounded-full bg-green-500 transition-transform duration-[660ms] after:absolute after:inset-0 after:bg-[linear-gradient(-45deg,_rgba(255,255,255,0.2)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.2)_50%,_rgba(255,255,255,0.2)_75%,_transparent_75%,_transparent)] after:bg-[length:30px_30px]',
        props.class,
      )
    "
    :style="`transform: translateX(-${100 - (props?.modelValue ?? 100)}%)`"
  />
</template>
