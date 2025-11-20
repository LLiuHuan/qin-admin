<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-08-13 16:09:52
 * @LastEditTime: 2025-08-13 16:35:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { Page } from '@qin/common-ui';
import { useVChart } from '@qin/plugins/vchart';

import { Card, Grid, GridItem } from '@arco-design/web-vue';

import DocButton from '#/components/DocButton/index.vue';

import {
  barMarkPointSpec,
  circularProgressTickSpec,
  histogramDifferentBinSpec,
  liquidChartSmartInvertSpec,
  rankingBarSpec,
  shapeWordCloudSpec,
  stackedDashAreaSpec,
} from './data';

const { domRef: stackedDashAreaRef } = useVChart(() => stackedDashAreaSpec);
const { domRef: barMarkPointRef } = useVChart(() => barMarkPointSpec);
const { domRef: histogramDifferentBinRef } = useVChart(
  () => histogramDifferentBinSpec,
);
const { domRef: rankingBarRef } = useVChart(() => rankingBarSpec);
const { domRef: shapeWordCloudRef } = useVChart(() => shapeWordCloudSpec);
const { domRef: circularProgressTickRef } = useVChart(
  () => circularProgressTickSpec,
);
const { domRef: liquidChartSmartInvertRef } = useVChart(
  () => liquidChartSmartInvertSpec,
);
</script>

<template>
  <Page
    description="开箱即用的多端图表库，生动灵活的数据故事讲述者"
    title="VChart"
  >
    <template #extra>
      <DocButton path="https://www.visactor.io/vchart" text="查看官方文档" />
    </template>
    <Grid
      :col-gap="24"
      :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }"
      :row-gap="12"
      item-responsive
      responsive="screen"
    >
      <GridItem :span="3" class="grid-item">
        <Card class="shadow-sm">
          <div ref="rankingBarRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="stackedDashAreaRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="barMarkPointRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="histogramDifferentBinRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="circularProgressTickRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="liquidChartSmartInvertRef" class="h-300px"></div>
        </Card>
      </GridItem>
      <GridItem class="grid-item">
        <Card class="shadow-sm">
          <div ref="shapeWordCloudRef" class="h-300px"></div>
        </Card>
      </GridItem>
    </Grid>
  </Page>
</template>

<style scoped></style>
