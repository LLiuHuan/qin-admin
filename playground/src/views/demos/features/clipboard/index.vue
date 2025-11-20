<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 04:30:39
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@qin/common-ui';

import { Button, Card, Input } from '@arco-design/web-vue';
import { useClipboard } from '@vueuse/core';

const source = ref('Hello');
const { copy, text } = useClipboard({ legacy: true, source });
</script>

<template>
  <Page title="剪切板示例">
    <Card title="基本使用">
      <p class="mb-3">
        Current copied: <code>{{ text || 'none' }}</code>
      </p>
      <div class="flex">
        <Input v-model="source" class="mr-3 flex w-[200px]" />
        <Button type="primary" @click="copy(source)"> Copy </Button>
      </div>
    </Card>
  </Page>
</template>
