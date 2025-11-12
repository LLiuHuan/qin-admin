<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-06-13 14:56:05
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { inject } from 'vue';

import { useScrollLock } from '@qin-core/composables';

useScrollLock();
const id = inject('DISMISSABLE_MODAL_ID');
</script>
<template>
  <div
    :data-dismissable-modal="id"
    class="bg-overlay/40 dark:bg-overlay/45 z-popup inset-0"
  ></div>
</template>
