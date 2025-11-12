<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-08-18 10:07:11
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { SupportedLanguagesType } from '@qin/locales';

import { SUPPORT_LANGUAGES } from '@qin/constants';
import { Languages } from '@qin/icons';
import { loadLocaleMessages } from '@qin/locales';
import { preferences, updatePreferences } from '@qin/preferences';

import { QinDropdownRadioMenu, QinIconButton } from '@qin-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <QinDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <QinIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
        <Languages class="text-foreground size-4" />
      </QinIconButton>
    </QinDropdownRadioMenu>
  </div>
</template>
