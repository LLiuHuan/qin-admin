<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-08-18 10:12:11
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ButtonVariants } from '../../ui';
import type { QinButtonProps } from './button';

import { computed, useSlots } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { QinTooltip } from '../tooltip';
import QinButton from './button.vue';

interface Props extends QinButtonProps {
  class?: any;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
});

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <QinButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </QinButton>

  <QinTooltip v-else :delay-duration="tooltipDelayDuration" :side="tooltipSide">
    <template #trigger>
      <QinButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </QinButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"> </slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </QinTooltip>
</template>
