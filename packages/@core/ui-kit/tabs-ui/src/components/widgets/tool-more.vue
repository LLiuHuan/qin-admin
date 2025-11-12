<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:47:21
 * @LastEditTime: 2025-08-18 10:09:37
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
      class="flex-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-2 text-lg font-semibold"
    >
      <ChevronDown class="size-4" />
    </div>
  </QinDropdownMenu>
</template>
