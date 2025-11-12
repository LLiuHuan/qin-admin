<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-08-18 10:12:24
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { QinButtonProps } from './button';

import { computed } from 'vue';

import { LoaderCircle } from '@qin-core/icons';
import { cn } from '@qin-core/shared/utils';

import { Primitive } from 'reka-ui';

import { buttonVariants } from '../../ui';

interface Props extends QinButtonProps {}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  class: '',
  disabled: false,
  loading: false,
  size: 'default',
  variant: 'default',
});

const isDisabled = computed(() => {
  return props.disabled || props.loading;
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="isDisabled"
  >
    <LoaderCircle
      v-if="loading"
      class="text-md mr-2 size-4 flex-shrink-0 animate-spin"
    />
    <slot></slot>
  </Primitive>
</template>
