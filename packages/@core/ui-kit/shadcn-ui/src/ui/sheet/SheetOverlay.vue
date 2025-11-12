<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-06-13 14:57:19
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { inject } from 'vue';

import { useScrollLock } from '@qin-core/composables';

useScrollLock();
const id = inject('DISMISSABLE_DRAWER_ID');
</script>
<template>
  <div
    :data-dismissable-drawer="id"
    class="bg-overlay/40 dark:bg-overlay/45 z-popup inset-0"
  ></div>
</template>
