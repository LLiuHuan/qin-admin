<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-18 10:03:39
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { Fallback, QinButton } from '@qin/common-ui';
import { useTabs } from '@qin/hooks';
import { X } from '@qin/icons';

const { closeCurrentTab } = useTabs();
</script>

<template>
  <Fallback
    description="当前路由在菜单中不可见"
    status="coming-soon"
    title="被隐藏的子菜单"
    show-back
  >
    <template #action>
      <QinButton size="lg" @click="closeCurrentTab()">
        <X class="mr-2 size-4" />
        关闭当前标签页
      </QinButton>
    </template>
  </Fallback>
</template>
