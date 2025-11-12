<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 11:47:26
 * @LastEditTime: 2025-08-12 15:19:00
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, watch } from 'vue';

import { useQinDesignTokens } from '@qin/hooks';
import { preferences } from '@qin/preferences';

import { ConfigProvider } from '@arco-design/web-vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

defineOptions({ name: 'App' });

const tokenLocale = computed(() =>
  preferences.app.locale === 'zh-CN' ? zhCN : enUS,
);

watch(
  () => preferences.theme.mode,
  (mode) => {
    if (mode === 'dark') {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  },
  { immediate: true },
);

useQinDesignTokens();
</script>

<template>
  <ConfigProvider :locale="tokenLocale">
    <RouterView />
  </ConfigProvider>
</template>
