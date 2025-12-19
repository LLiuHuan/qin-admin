<script lang="ts" setup>
import type { ProgressRootEmits, ProgressRootProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { ProgressRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ProgressRootProps & { class?: any }>();
const emits = defineEmits<ProgressRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ProgressRoot
    v-bind="forwarded"
    :class="
      cn(
        'border-muted relative h-2 overflow-hidden rounded-full border bg-white dark:bg-stone-950',
        props.class,
      )
    "
  >
    <slot></slot>
  </ProgressRoot>
</template>

<style lang="scss" scoped></style>
