<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-06-15 17:14:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ChevronDown } from '@qin-core/icons';
import { cn } from '@qin-core/shared/utils';

const props = defineProps<{
  class?: string;
}>();

// 控制箭头展开/收起状态
const collapsed = defineModel({ default: false });
</script>

<template>
  <div
    :class="cn('qin-link inline-flex items-center', props.class)"
    @click="collapsed = !collapsed"
  >
    <slot :is-expanded="collapsed">
      {{ collapsed }}
      <!-- <span>{{ isExpanded ? '收起' : '展开' }}</span> -->
    </slot>
    <div
      :class="{ 'rotate-180': !collapsed }"
      class="transition-transform duration-300"
    >
      <slot name="icon">
        <ChevronDown class="size-4" />
      </slot>
    </div>
  </div>
</template>
