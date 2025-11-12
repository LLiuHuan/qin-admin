<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-08-18 10:14:41
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { CustomRenderType } from '../types';

import {
  FormLabel,
  QinHelpTooltip,
  QinRenderContent,
} from '@qin-core/shadcn-ui';
import { cn } from '@qin-core/shared/utils';

interface Props {
  class?: string;
  colon?: boolean;
  help?: CustomRenderType;
  label?: CustomRenderType;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
    <QinHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <QinRenderContent :content="help" />
    </QinHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
