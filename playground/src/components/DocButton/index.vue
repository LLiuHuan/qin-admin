<!--
 * @Description: 组件文档按钮
 * @Author: LLiuHuan
 * @Date: 2025-07-24 01:58:17
 * @LastEditTime: 2025-07-24 01:58:59
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { QIN_DOC_URL } from '@qin/constants';
import { openWindow } from '@qin/utils';

import { Button } from '@arco-design/web-vue';

const props = defineProps<{ path: string; text?: string }>();

function handleClick() {
  let path = props.path;
  if (!path.toLowerCase().startsWith('http')) {
    // 如果没有.html，打开页面时可能会出现404
    path =
      QIN_DOC_URL +
      (props.path.toLowerCase().endsWith('.html')
        ? props.path
        : `${props.path}.html`);
  }
  openWindow(path);
}
</script>

<template>
  <Button @click="handleClick">{{ text ? text : '查看组件文档' }}</Button>
</template>
