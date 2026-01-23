<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:47:21
 * @LastEditTime: 2026-01-23 15:06:04
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { DropdownMenuProps } from '@qin-core/shadcn-ui';

import { ChevronDown } from '@qin-core/icons';
import { QinDropdownMenu } from '@qin-core/shadcn-ui';

defineProps<DropdownMenuProps>();
</script>

<template>
  <QinDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center hover:bg-muted hover:text-accent-foreground text-foreground/80 border-border h-full cursor-pointer border-l px-2 text-lg font-semibold"
    >
      <ChevronDown class="size-4" />
    </div>
  </QinDropdownMenu>
</template>
