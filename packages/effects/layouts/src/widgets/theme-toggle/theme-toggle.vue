<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-08-18 10:05:47
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { ThemeModeType } from '@qin/types';

import { MoonStar, Sun, SunMoon } from '@qin/icons';
import { $t } from '@qin/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@qin/preferences';

import { QinTooltip, ToggleGroup, ToggleGroupItem } from '@qin-core/shadcn-ui';

import ThemeButton from './theme-button.vue';

interface TransitionParams {
  distance: number;
  duration: number;
  ease: string;
  perspective: number;
}

defineOptions({
  name: 'ThemeToggle',
});

withDefaults(defineProps<Props>(), {
  shouldOnHover: false,
  transition: 'normal',
  transitionParams: () => ({
    perspective: 400,
    distance: 0.75,
    duration: 1.2,
    ease: 'ease-in-out',
  }),
});

interface Props {
  /**
   * 是否鼠标悬停时显示
   */
  shouldOnHover?: boolean;

  /**
   * 动画类型
   */
  transition?: '3d' | 'normal';

  /**
   * 动画参数
   */
  transitionParams?: TransitionParams;
}

function handleChange(isDark: boolean | undefined) {
  updatePreferences({
    theme: { mode: isDark ? 'dark' : 'light' },
  });
}

const { isDark } = usePreferences();

const PRESETS = [
  {
    icon: Sun,
    name: 'light',
    title: $t('preferences.theme.light'),
  },
  {
    icon: MoonStar,
    name: 'dark',
    title: $t('preferences.theme.dark'),
  },
  {
    icon: SunMoon,
    name: 'auto',
    title: $t('preferences.followSystem'),
  },
];
</script>
<template>
  <div>
    <QinTooltip :disabled="!shouldOnHover" side="bottom">
      <template #trigger>
        <ThemeButton
          :model-value="isDark"
          type="icon"
          :transition="transition"
          :transition-params="transitionParams"
          @update:model-value="handleChange"
        />
      </template>
      <ToggleGroup
        :model-value="preferences.theme.mode"
        class="gap-2"
        type="single"
        variant="outline"
        @update:model-value="
          (val) => updatePreferences({ theme: { mode: val as ThemeModeType } })
        "
      >
        <ToggleGroupItem
          v-for="item in PRESETS"
          :key="item.name"
          :value="item.name"
        >
          <component :is="item.icon" class="size-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </QinTooltip>
  </div>
</template>
