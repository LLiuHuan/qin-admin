<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 09:15:10
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

import { Page } from '@qin/common-ui';

import { Card, Radio, RadioGroup } from '@arco-design/web-vue';

import StatusAPI from '#/api/examples/status';

const params = { ids: [2512, 3241, 4255], code: 'P@ssw0rd123!@' };
const paramsSerializer = ref<'brackets' | 'comma' | 'indices' | 'repeat'>(
  'brackets',
);
const response = ref('');
const paramsStr = computed(() => {
  try {
    if (!response.value) return '';
    const url = response.value;
    return new URL(url).searchParams.toString();
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
});

const loading = ref(false);
const error = ref<null | string>(null);
watchEffect(() => {
  loading.value = true;
  error.value = null;
  StatusAPI.status1(params, paramsSerializer.value)
    .then((res) => {
      response.value = res.request.responseURL;
    })
    .catch((error_) => {
      error.value = error_.message || 'Request failed';
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
<template>
  <Page
    title="请求参数序列化"
    description="不同的后台接口可能对数组类型的GET参数的解析方式不同，我们预置了几种数组序列化方式，通过配置 paramsSerializer 来实现不同的序列化方式"
  >
    <Card>
      <RadioGroup v-model="paramsSerializer" name="paramsSerializer">
        <Radio value="brackets">brackets</Radio>
        <Radio value="comma">comma</Radio>
        <Radio value="indices">indices</Radio>
        <Radio value="repeat">repeat</Radio>
      </RadioGroup>
      <div class="mt-4 flex flex-col gap-4">
        <div>
          <h3>需要提交的参数</h3>
          <div>{{ JSON.stringify(params, null, 2) }}</div>
        </div>
        <template v-if="response">
          <div v-if="loading" class="text-blue-500">Loading...</div>
          <div v-if="error" class="text-red-500">Error: {{ error }}</div>
          <div>
            <h3>访问地址</h3>
            <pre>{{ response }}</pre>
          </div>
          <div>
            <h3>参数字符串</h3>
            <pre>{{ paramsStr }}</pre>
          </div>
          <div>
            <h3>参数解码</h3>
            <pre>{{ decodeURIComponent(paramsStr) }}</pre>
          </div>
        </template>
      </div>
    </Card>
  </Page>
</template>
