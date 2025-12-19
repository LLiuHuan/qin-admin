<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-08-13 16:09:52
 * @LastEditTime: 2025-08-13 16:35:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

import { Page } from '@qin/common-ui';
import { useEcharts } from '@qin/plugins/echarts';

import { Card, Grid, GridItem } from '@arco-design/web-vue';

import DocButton from '#/components/DocButton/index.vue';

import {
  barOptions,
  gaugeOptions,
  lineOptions,
  pieOptions,
  scatterOptions,
  treeOptions,
} from './data';

useEcharts(useTemplateRef('lineRef'), () => lineOptions);
useEcharts(useTemplateRef('barRef'), () => barOptions);
useEcharts(useTemplateRef('pieRef'), () => pieOptions);
useEcharts(useTemplateRef('scatterRef'), () => scatterOptions);
useEcharts(useTemplateRef('treeRef'), () => treeOptions);
const { setOptions: setGaugeOptions } = useEcharts(
  useTemplateRef('gaugeRef'),
  () => gaugeOptions,
);

let intervalId: ReturnType<typeof setInterval> | undefined;

function initGaugeChart() {
  intervalId = setInterval(() => {
    const date = new Date();
    const second = date.getSeconds();
    const minute = date.getMinutes() + second / 60;
    const hour = (date.getHours() % 12) + minute / 60;

    setGaugeOptions({
      animationDurationUpdate: 300,
      series: [
        {
          name: 'hour',
          animation: hour !== 0,
          data: [{ value: hour }],
        },
        {
          name: 'minute',
          animation: minute !== 0,
          data: [{ value: minute }],
        },
        {
          animation: second !== 0,
          name: 'second',
          data: [{ value: second }],
        },
      ],
    });
  }, 1000);
}

function clearGaugeChart() {
  if (intervalId !== null) clearInterval(intervalId);
}

onMounted(initGaugeChart);

onUnmounted(clearGaugeChart);
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
          <div ref="lineRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="barRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="pieRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="scatterRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="treeRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="gaugeRef" class="h-300px"></div>
        </Card>
      </GridItem>
    </Grid>
  </Page>
</template>

<style scoped></style>
