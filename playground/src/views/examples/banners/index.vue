<script lang="ts" setup>
import { BasicBanner, CardBanner, Page } from '@qin/common-ui';

import { Button, Card, Col, Row } from '@arco-design/web-vue';

/**
 * 处理横幅点击事件
 */
const handleBannerClick = () => {
  console.log('banner clicked');
};

/**
 * 处理确认按钮点击事件
 */
const handleConfirm = () => {
  console.log('confirm clicked');
};

/**
 * 处理取消按钮点击事件
 */
const handleCancel = () => {
  console.log('cancel clicked');
};

/**
 * 预设横幅配置
 * 提供常用的横幅样式配置，可直接通过 v-bind 使用
 */
const PresetBanners = {
  marketing: {
    title: '限时优惠活动',
    subtitle: '精选商品 48 小时闪购，最高享受 7 折优惠，数量有限！',
    titleColor: '#333',
    subtitleColor: '#666',
    boxStyle: '!bg-[hsl(var(--success)/15%)]',
    meteorConfig: { enabled: true, count: 15 },
    buttonConfig: {
      show: true,
      text: '立即抢购',
      color: 'hsl(var(--success))',
      textColor: '#fff',
    },
  },
  info: {
    title: '服务到期提醒',
    subtitle: '您的高级服务将在 7 天后到期，请及时续费以继续享受完整功能。',
    titleColor: '#333',
    subtitleColor: '#666',
    boxStyle: '!bg-[hsl(var(--primary)/15%)]',
    meteorConfig: { enabled: true, count: 15 },
    buttonConfig: {
      show: true,
      text: '立即续费',
      color: 'hsl(var(--primary))',
      textColor: '#fff',
    },
  },
} as const;
</script>

<template>
  <Page title="横幅示例">
    <Card class="mb-4" title="基础 & 自定义按钮+背景色">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner
            title="数据中心运行状态"
            subtitle="系统访问量同比增长 23%，所有服务运行稳定，数据监控正常。"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner
            title="欢迎使用 Qin Admin"
            subtitle="基于 Vue 3 + TypeScript + Arco Design 构建的现代化管理系统。"
            title-color="#333"
            subtitle-color="#666"
            box-style="!bg-[#D4F1F7]"
            :button-config="{
              show: true,
              text: '开始探索',
              color: 'hsl(var(--success))',
              textColor: '#fff',
              radius: '6px',
            }"
            @button-click="handleBannerClick"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="自定义图片 & 使用 slot 自定义内容">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner
            title="探索星空计划"
            subtitle="加入我们的天文观测活动，发现宇宙的奥秘"
            box-style="!bg-[#FF8AAB]"
            :button-config="{
              show: true,
              text: '立即参与',
              color: '#FF5A89',
              textColor: '#fff',
            }"
            :image-config="{
              src: 'https://unpkg.com/arco-static@0.0.6/source/3d-icon3.webp',
            }"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner
            box-style="!bg-[#70B1FF]"
            :image-config="{
              src: 'https://unpkg.com/arco-static@0.0.6/source/3d-icon5.webp',
            }"
          >
            <template #title>
              <h2 style="margin: 0; font-size: 1.6rem; color: #fff !important">
                智能组件系统
              </h2>
            </template>

            <template #subtitle>
              <div style="margin-top: 12px">
                <p style="position: rative; z-index: 10; font-style: italic">
                  灵活配置，强大扩展，支持自定义插槽内容
                </p>
              </div>
            </template>

            <template #button>
              <div style="margin-top: 12px">
                <Button type="primary" color="#04A1FF"> 查看文档 </Button>
              </div>
            </template>
          </BasicBanner>
        </Col>
      </Row>
    </Card>
    <Card class="mb-4" title="抽象配置方案（Preset 模式）">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner v-bind="PresetBanners.marketing" />
        </Col>
        <Col :xs="24" :sm="12" :md="12" class="mb-5">
          <BasicBanner v-bind="PresetBanners.info" />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="卡片横幅">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="12" :lg="6" class="mb-5">
          <CardBanner
            title="系统运行正常"
            description="所有核心服务运行稳定，响应时间在正常范围内。"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="6" class="mb-5">
          <CardBanner
            image="https://unpkg.com/arco-static@0.0.6/source/3d-icon2.webp"
            title="重要消息通知"
            description="您有 3 条待处理的重要消息，请及时查看。"
            :button="{
              show: true,
              text: '查看详情',
              color: 'hsl(var(--warning))',
              textColor: '#fff',
            }"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="6" class="mb-5">
          <CardBanner
            image="https://unpkg.com/arco-static@0.0.6/source/3d-icon3.webp"
            title="数据分析报告"
            description="本周业务数据分析报告已完成，请查看关键指标。"
            :button="{
              show: true,
              text: '下载报告',
              color: 'hsl(var(--red))',
              textColor: '#fff',
            }"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="6" class="mb-5">
          <CardBanner
            image="https://unpkg.com/arco-static@0.0.6/source/3d-icon4.webp"
            title="版本更新提醒"
            description="Art Design Pro v2.1.0 已发布，包含性能优化和新功能。"
            :button="{
              show: true,
              text: '立即更新',
              color: 'hsl(var(--primary))',
              textColor: '#fff',
            }"
            :cancel-button="{
              show: true,
              text: '稍后提醒',
              color: '#eee',
              textColor: '#333',
            }"
            @click="handleConfirm"
            @cancel="handleCancel"
          />
        </Col>
      </Row>
    </Card>
  </Page>
</template>

<style lang="scss" scoped>
.page-title {
  @apply my-5 text-xl font-medium first:mt-0;
}
</style>
