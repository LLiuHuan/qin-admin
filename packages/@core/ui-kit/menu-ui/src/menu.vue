<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:11:10
 * @LastEditTime: 2025-05-27 11:12:36
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { MenuRecordRaw } from '@qin-core/typings';

import type { MenuProps } from './types';

import { useForwardProps } from '@qin-core/composables';

import { Menu } from './components';
import SubMenu from './sub-menu.vue';

interface Props extends MenuProps {
  menus: MenuRecordRaw[];
}

defineOptions({
  name: 'MenuView',
});

const props = withDefaults(defineProps<Props>(), {
  collapse: false,
});

const forward = useForwardProps(props);
</script>

<template>
  <Menu v-bind="forward">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu :menu="menu" />
    </template>
  </Menu>
</template>
