<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:44:54
 * @LastEditTime: 2025-05-27 15:34:11
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@qin/hooks';

import { ElConfigProvider } from 'element-plus';

import { elementLocale } from '#/locales';

defineOptions({ name: 'App' });

useElementPlusDesignTokens();
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
