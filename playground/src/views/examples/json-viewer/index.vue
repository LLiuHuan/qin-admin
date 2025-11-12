<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 21:11:21
 * @LastEditTime: 2025-07-31 21:11:50
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { JsonViewerAction, JsonViewerValue } from '@qin/common-ui';

import { JsonViewer, Page } from '@qin/common-ui';

import { Card, Message } from '@arco-design/web-vue';

import { json1, json2 } from './data';

function handleKeyClick(key: string) {
  Message.info(`点击了Key ${key}`);
}

function handleValueClick(value: JsonViewerValue) {
  Message.info(`点击了Value ${JSON.stringify(value)}`);
}

function handleCopied(_event: JsonViewerAction) {
  Message.success('已复制JSON');
}
</script>
<template>
  <Page
    title="Json Viewer"
    description="一个渲染 JSON 结构数据的组件，支持复制、展开等，简单易用"
  >
    <Card title="默认配置">
      <JsonViewer :value="json1" />
    </Card>
    <Card title="可复制、默认展开3层、显示边框、事件处理" class="mt-4">
      <JsonViewer
        :value="json2"
        :expand-depth="3"
        copyable
        :sort="false"
        @key-click="handleKeyClick"
        @value-click="handleValueClick"
        @copied="handleCopied"
        boxed
      />
    </Card>
    <Card title="预览模式" class="mt-4">
      <JsonViewer
        :value="json2"
        copyable
        preview-mode
        :show-array-index="false"
      />
    </Card>
  </Page>
</template>
