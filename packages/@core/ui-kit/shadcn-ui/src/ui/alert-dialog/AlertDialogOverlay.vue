<!--
 * @Description: dialog 遮罩层
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-06-13 14:56:09
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { useScrollLock } from '@qin-core/composables';

useScrollLock();
</script>
<template>
  <div class="bg-overlay/40 dark:bg-overlay/45 z-popup inset-0"></div>
</template>
