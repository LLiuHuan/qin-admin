<script lang="ts" setup>
import type { ProgressRootProps } from 'reka-ui';

import { cn } from '@qin-core/shared/utils';

import { Progress, ProgressIndicator } from '../../ui';

interface Props extends ProgressRootProps {
  class?: string;
  indicatorClass?: string;
  indicatorStyle?: object;
  style?: object;
  // indicatorProps?: ProgressIndicatorProps;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <Progress
    :model-value="modelValue"
    :max="max"
    :class="cn(props.class)"
    :style="props.style"
  >
    <ProgressIndicator
      :model-value="modelValue"
      :class="indicatorClass"
      :style="indicatorStyle"
    />
  </Progress>
</template>

<style lang="scss" scoped></style>
