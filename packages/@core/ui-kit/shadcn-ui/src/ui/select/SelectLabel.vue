<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:11:25
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui';

import { cn } from '@qin-core/shared/utils';

import { SelectLabel } from 'reka-ui';

const props = defineProps<SelectLabelProps & { class?: any }>();
</script>

<template>
  <SelectLabel :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
    <slot></slot>
  </SelectLabel>
</template>
