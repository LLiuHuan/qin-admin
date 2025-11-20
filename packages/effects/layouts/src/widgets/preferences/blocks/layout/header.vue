<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:17:42
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type {
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  SelectOption,
} from '@qin/types';

import { $t } from '@qin/locales';

import SelectItem from '../select-item.vue';
import SwitchItem from '../switch-item.vue';
import ToggleItem from '../toggle-item.vue';

defineProps<{ currentLayout?: LayoutType; disabled: boolean }>();

const headerEnable = defineModel<boolean>('headerEnable');
const headerMode = defineModel<LayoutHeaderModeType>('headerMode');
const headerMenuAlign =
  defineModel<LayoutHeaderMenuAlignType>('headerMenuAlign');

const localeItems: SelectOption[] = [
  {
    label: $t('preferences.header.modeStatic'),
    value: 'static',
  },
  {
    label: $t('preferences.header.modeFixed'),
    value: 'fixed',
  },
  {
    label: $t('preferences.header.modeAuto'),
    value: 'auto',
  },
  {
    label: $t('preferences.header.modeAutoScroll'),
    value: 'auto-scroll',
  },
];

const headerMenuAlignItems: SelectOption[] = [
  {
    label: $t('preferences.header.menuAlignStart'),
    value: 'start',
  },
  {
    label: $t('preferences.header.menuAlignCenter'),
    value: 'center',
  },
  {
    label: $t('preferences.header.menuAlignEnd'),
    value: 'end',
  },
];
</script>

<template>
  <SwitchItem v-model="headerEnable" :disabled="disabled">
    {{ $t('preferences.header.visible') }}
  </SwitchItem>
  <SelectItem
    v-model="headerMode"
    :disabled="!headerEnable"
    :items="localeItems"
  >
    {{ $t('preferences.mode') }}
  </SelectItem>
  <!--
布局方式
sidebar-nav 侧边菜单布局
header-nav 顶部菜单布局
mixed-nav 侧边&顶部菜单布局
sidebar-mixed-nav 侧边混合菜单布局
full-content 全屏内容布局
@default sidebar-nav

-->
  <ToggleItem
    v-model="headerMenuAlign"
    :disabled="
      !headerEnable ||
      !['mixed-nav', 'header-mixed-nav', 'header-nav'].includes(
        currentLayout as string,
      )
    "
    :items="headerMenuAlignItems"
  >
    {{ $t('preferences.header.menuAlign') }}
  </ToggleItem>
</template>
