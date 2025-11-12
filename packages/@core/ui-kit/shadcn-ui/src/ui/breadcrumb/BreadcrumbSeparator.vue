<!--
 * @Description: 面包屑折叠
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-06-13 15:15:58
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { cn } from '@qin-core/shared/utils';

import { ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <li
    :class="cn('h-14px [&>svg]:size-3.5', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
