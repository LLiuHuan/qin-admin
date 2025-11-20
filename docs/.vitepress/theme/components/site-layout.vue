<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-14 20:09:29
 * @LastEditTime: 2025-07-15 02:23:22
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

// import { useAntdDesignTokens } from '@qin/hooks';
// import { initPreferences } from '@qin/preferences';
import { ConfigProvider, theme } from 'ant-design-vue';
import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
const route = useRoute();
// const { tokens } = useAntdDesignTokens();

const initZoom = () => {
  // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
  mediumZoom('.VPContent img', { background: 'var(--vp-c-bg)' });
};

const isDark = ref(true);

watch(
  () => route.path,
  () => nextTick(() => initZoom()),
);

// initPreferences({
//   namespace: 'docs',
// });

onMounted(() => {
  initZoom();
});

// 使用该函数
const observer = watchDarkModeChange((dark) => {
  isDark.value = dark;
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

function watchDarkModeChange(callback: (isDark: boolean) => void) {
  if (typeof window === 'undefined') {
    return;
  }
  const htmlElement = document.documentElement;

  const observer = new MutationObserver(() => {
    const isDark = htmlElement.classList.contains('dark');
    callback(isDark);
  });

  observer.observe(htmlElement, {
    attributeFilter: ['class'],
    attributes: true,
  });

  const initialIsDark = htmlElement.classList.contains('dark');
  callback(initialIsDark);

  return observer;
}

const tokenTheme = computed(() => {
  const algorithm = isDark.value
    ? [theme.darkAlgorithm]
    : [theme.defaultAlgorithm];

  return {
    algorithm,
    // token: tokens,
  };
});
</script>

<template>
  <ConfigProvider :theme="tokenTheme">
    <Layout />
  </ConfigProvider>
</template>

<style>
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 2147483647;
}
</style>
