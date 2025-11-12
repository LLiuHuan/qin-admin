<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@qin/common-ui';
import {
  downloadFileFromBase64,
  downloadFileFromBlobPart,
  downloadFileFromImageUrl,
  downloadFileFromUrl,
} from '@qin/utils';

import { Button, Card } from '@arco-design/web-vue';

import DownloadAPI from '#/api/examples/download';

import imageBase64 from './base64';

const downloadResult = ref('');

function getBlob() {
  DownloadAPI.file1()
    .then((res) => {
      downloadResult.value = `获取Blob成功，长度：${res.size}`;
    })
    .catch((error) => {
      downloadResult.value = `获取Blob失败：${error.message}`;
    });
}

function getResponse() {
  DownloadAPI.file2()
    .then((res) => {
      downloadResult.value = `获取Response成功，headers：${JSON.stringify(res.headers)},长度：${res.data.size}`;
    })
    .catch((error) => {
      downloadResult.value = `获取Response失败：${error.message}`;
    });
}
</script>

<template>
  <Page title="文件下载示例">
    <Card title="根据文件地址下载文件">
      <Button
        type="primary"
        @click="
          downloadFileFromUrl({
            source: 'https://codeload.github.com/lliuhuan/qin-admin/zip/master',
            target: '_self',
          })
        "
      >
        Download File
      </Button>
    </Card>

    <Card class="my-5" title="根据地址下载图片">
      <Button
        type="primary"
        @click="
          downloadFileFromImageUrl({
            source: 'https://unpkg.com/arco-static@0.0.3/source/logo.png',
            fileName: 'arco-logo.png',
          })
        "
      >
        Download File
      </Button>
    </Card>

    <Card class="my-5" title="base64流下载">
      <Button
        type="primary"
        @click="
          downloadFileFromBase64({
            source: imageBase64,
            fileName: 'image.png',
          })
        "
      >
        Download Image
      </Button>
    </Card>
    <Card class="my-5" title="文本下载">
      <Button
        type="primary"
        @click="
          downloadFileFromBlobPart({
            source: 'text content',
            fileName: 'test.txt',
          })
        "
      >
        下载文本
      </Button>
    </Card>

    <Card class="my-5" title="Request download">
      <Button type="primary" @click="getBlob"> 获取Blob </Button>
      <Button type="primary" class="ml-4" @click="getResponse">
        获取Response
      </Button>
      <div class="mt-4">{{ downloadResult }}</div>
    </Card>
  </Page>
</template>
