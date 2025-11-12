<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:54:04
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { SelectGroupProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@qin-core/shared/utils';

import { SelectGroup } from 'reka-ui';

const props = defineProps<SelectGroupProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectGroup :class="cn('w-full p-1', props.class)" v-bind="delegatedProps">
    <slot></slot>
  </SelectGroup>
</template>
