<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-08-18 10:07:38
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { QinSpinner } from '@qin-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <QinSpinner :spinning="spinning" />
</template>
