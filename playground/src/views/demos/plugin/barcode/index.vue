<script lang="ts" setup>
import type { Options } from 'jsbarcode';

import { onMounted } from 'vue';

import { Page } from '@qin/common-ui';

import { Card, Grid, GridItem } from '@arco-design/web-vue';
import JsBarcode from 'jsbarcode';

import DocButton from '#/components/DocButton/index.vue';

const text = 'Hello';

interface CodeConfig {
  id: string;
  options: Options;
  text: string;
  title: string;
}

const codes: CodeConfig[] = [
  {
    id: 'code39',
    title: 'CODE 39 正常尺寸',
    text,
    options: { format: 'code39' },
  },
  {
    id: 'code128',
    title: 'CODE 128 正常尺寸',
    text,
    options: {},
  },
  {
    id: 'ean-13',
    title: 'ENA-13 商品条形码',
    text: '1234567890128',
    options: { format: 'ean13' },
  },
  {
    id: 'upc-a',
    title: 'UPC-A 商品条形码',
    text: '123456789012',
    options: { format: 'upc' },
  },
  {
    id: 'barcode',
    title: '不一样的高度，不一样的颜色',
    text,
    options: {
      height: 30,
      lineColor: '#9ca3af',
    },
  },
  {
    id: 'barcode1',
    title: '加个背景色',
    text,
    options: {
      background: '#9ca3af',
      lineColor: '#ffffff',
    },
  },
  {
    id: 'barcode2',
    title: '字体好大',
    text,
    options: {
      fontSize: 40,
    },
  },
  {
    id: 'barcode3',
    title: '粗狂的条码，文字离远点',
    text: 'Hi',
    options: {
      textMargin: 30,
      width: 4,
    },
  },
  {
    id: 'barcode4',
    title: '字体跑上面来，还是粗体',
    text,
    options: {
      textPosition: 'top',
      fontOptions: 'bold',
    },
  },
];

function generateBarcode() {
  codes.forEach((code) => {
    JsBarcode(`#${code.id}`, code.text, code.options);
  });
}

onMounted(() => {
  generateBarcode();
});
</script>

<template>
  <Page
    description="JsBarcode 是一个用 JavaScript 编写的条形码生成器。它支持多种条形码格式，可在浏览器和 Node.js 中使用。"
    title="条形码"
  >
    <template #extra>
      <DocButton path="https://lindell.me/JsBarcode/" text="查看官方文档" />
    </template>
    <Card>
      <Grid
        :col-gap="24"
        :cols="{ xs: 1, sm: 2, md: 3 }"
        :row-gap="12"
        item-responsive
        responsive="screen"
      >
        <GridItem v-for="item in codes" :key="item.id">
          <div class="flex-col-center">
            <h3>{{ item.title }}</h3>
            <svg :id="item.id" class="h-130px" />
          </div>
        </GridItem>
      </Grid>
    </Card>
  </Page>
</template>

<style scoped></style>
