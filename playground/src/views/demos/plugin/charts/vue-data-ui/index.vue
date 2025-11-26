<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-11-26 09:51:06
 * @LastEditTime: 2025-11-26 11:07:54
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { Page } from '@qin/common-ui';

import { Card, Grid, GridItem } from '@arco-design/web-vue';

import {
  barChat,
  lintChat,
  pieChat,
  treeMapChat,
  wheelChat,
  wordChat,
} from './components';
</script>

<template>
  <Page description="一个基于 JavaScript 的开源可视化图表库" title="ECharts">
    <template #extra>
      <DocButton path="https://echarts.apache.org" text="查看官方文档" />
    </template>
    <Grid
      :col-gap="24"
      :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }"
      :row-gap="12"
      item-responsive
      responsive="screen"
    >
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <lintChat />
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <treeMapChat />
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <barChat />
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <pieChat />
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <wordChat />
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <wheelChat />
        </Card>
      </GridItem>
    </Grid>
  </Page>
</template>

<style lang="less" scoped></style>
