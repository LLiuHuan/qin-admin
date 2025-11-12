<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:17:38
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { $t } from '@qin/locales';

import SwitchItem from '../switch-item.vue';

const footerEnable = defineModel<boolean>('footerEnable');
const footerFixed = defineModel<boolean>('footerFixed');
</script>

<template>
  <SwitchItem v-model="footerEnable">
    {{ $t('preferences.footer.visible') }}
  </SwitchItem>
  <SwitchItem v-model="footerFixed" :disabled="!footerEnable">
    {{ $t('preferences.footer.fixed') }}
  </SwitchItem>
</template>
