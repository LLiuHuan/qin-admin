<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:28:55
 * @LastEditTime: 2025-06-04 23:44:00
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from '@qin-core/icons';

const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover absolute bottom-2 left-3 z-10 cursor-pointer rounded-sm bg-[hsl(var(--accent))] p-1"
    @click.stop="handleCollapsed"
  >
    <ChevronsRight v-if="collapsed" class="size-4" />
    <ChevronsLeft v-else class="size-4" />
  </div>
</template>
