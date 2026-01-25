<script setup lang="ts">
import {
  BarChartCard,
  DataListCard,
  DonutChartCard,
  ImageCard,
  LineChartCard,
  Page,
  ProgressCard,
  StatsCard,
  TimelineListCard,
} from '@qin/common-ui';

import {
  Card,
  Col,
  Message,
  Row,
  Timeline,
  TimelineItem,
} from '@arco-design/web-vue';

defineOptions({ name: 'TemplateCards' });

/**
 * 统计卡片数据配置
 */
const statsCards = [
  {
    id: 1,
    title: '销售产品',
    count: 1235,
    description: '鞋子、牛仔裤、派对服装、手表',
    icon: 'ri:bar-chart-box-line',
    boxStyle: '!bg-[hsl(var(--primary)/10%)]',
    customIconStyle: '!text-[hsl(var(--primary))] !text-3xl',
    iconStyle: '!bg-[hsl(var(--primary))]',
    textColor: 'hsl(var(--primary))',
    showArrow: false,
  },
  {
    id: 2,
    title: '活跃用户',
    count: 5000,
    description: '日活跃用户超过5,000+',
    icon: 'ri:account-box-2-line',
    boxStyle: '!bg-orange-400/10',
    customIconStyle: '!text-orange-400 !text-3xl',
    iconStyle: 'bg-orange-400',
    textColor: 'rgb(251 146 60)',
    showArrow: false,
  },
  {
    id: 3,
    title: '总收入',
    count: 35_000,
    description: '月收入超过¥350,000+',
    icon: 'ri:money-cny-box-line',
    boxStyle: '!bg-blue-400/10',
    customIconStyle: '!text-blue-400 !text-3xl',
    iconStyle: 'bg-blue-400',
    textColor: 'rgb(96 165 250)',
    showArrow: false,
  },
  {
    id: 4,
    title: '客户评价',
    count: 4800,
    description: '平均评分4.8/5',
    icon: 'ri:message-3-line',
    boxStyle: '!bg-red-400/10',
    customIconStyle: '!text-red-400 !text-3xl',
    iconStyle: 'bg-red-400',
    textColor: 'rgb(248 113 113)',
    showArrow: false,
  },
];

const progressCards = [
  {
    id: 1,
    title: '完成进度',
    percentage: 75,
    color: 'hsl(var(--primary))',
    icon: 'ri:arrow-up-circle-line',
    iconStyle: '!bg-[hsl(var(--primary)/12%)] text-[hsl(var(--primary))]',
  },
  {
    id: 2,
    title: '项目进度',
    percentage: 65,
    color: 'rgb(251 146 60)',
    icon: 'ri:twitch-line',
    iconStyle: 'bg-orange-400/12 text-orange-400',
  },
  {
    id: 3,
    title: '学习进度',
    percentage: 45,
    color: 'rgb(96 165 250)',
    icon: 'ri:game-line',
    iconStyle: '!bg-blue-400/12 text-blue-400',
  },
  {
    id: 4,
    title: '任务进度',
    percentage: 90,
    color: 'rgb(248 113 113)',
    icon: 'ri:flag-2-line',
    iconStyle: 'bg-red-400/12 text-red-400',
  },
];

const imageCards = [
  {
    id: 1,
    imageUrl: 'https://unpkg.com/arco-static@0.0.6/source/cover-img1.webp',
    title: 'AI技术在医疗领域的创新应用与发展前景',
    category: '社交',
    readTime: '2分钟',
    views: 9125,
    comments: 3,
    date: '12月19日 周一',
  },
  {
    id: 2,
    imageUrl: 'https://unpkg.com/arco-static@0.0.6/source/cover-img2.webp',
    title: '大数据分析助力企业决策的实践案例',
    category: '技术',
    readTime: '3分钟',
    views: 7234,
    comments: 5,
    date: '12月20日 周二',
  },
  {
    id: 3,
    imageUrl: 'https://unpkg.com/arco-static@0.0.6/source/cover-img3.webp',
    title: '区块链技术在供应链管理中的应用',
    category: '科技',
    readTime: '4分钟',
    views: 5678,
    comments: 8,
    date: '12月21日 周三',
  },
  {
    id: 4,
    imageUrl: 'https://unpkg.com/arco-static@0.0.6/source/cover-img4.webp',
    title: '云计算技术发展趋势与未来展望',
    category: '云技术',
    readTime: '5分钟',
    views: 4321,
    comments: 6,
    date: '12月22日 周四',
  },
];

const dataList = [
  {
    title: '新加坡之行',
    status: '进行中',
    time: '5分钟',
    class: 'bg-[hsl(var(--primary)/12%)] text-[hsl(var(--primary))]',
    icon: 'ri:camera-4-line',
  },
  {
    title: '归档数据',
    status: '进行中',
    time: '10分钟',
    class: 'bg-blue-400/12 text-blue-400',
    icon: 'ri:bar-chart-box-line',
  },
  {
    title: '客户会议',
    status: '待处理',
    time: '15分钟',
    class: 'bg-warning/12 text-warning',
    icon: 'ri:user-3-line',
  },
  {
    title: '筛选任务团队',
    status: '进行中',
    time: '20分钟',
    class: 'bg-red-400/12 text-red-400',
    icon: 'ri:account-circle-line',
  },
  {
    title: '发送信封给小王',
    status: '已完成',
    time: '20分钟',
    class: 'bg-success/12 text-[hsl(var(--success))]',
    icon: 'ri:message-3-line',
  },
];

const timineData = [
  {
    time: '上午 09:30',
    status: 'rgb(73, 190, 255)',
    content: '收到 John Doe 支付的 385.90 美元',
  },
  {
    time: '上午 10:00',
    status: 'rgb(54, 158, 255)',
    content: '新销售记录',
    code: 'ML-3467',
  },
  {
    time: '上午 12:00',
    status: 'rgb(103, 232, 207)',
    content: '向 Micha 支付了 64.95 美元',
  },
  {
    time: '下午 14:30',
    status: 'rgb(255, 193, 7)',
    content: '系统维护通知',
    code: 'MT-2023',
  },
  {
    time: '下午 15:45',
    status: 'rgb(255, 105, 105)',
    content: '紧急订单取消提醒',
    code: 'OR-9876',
  },
  {
    time: '下午 17:00',
    status: 'rgb(103, 232, 207)',
    content: '完成每日销售报表',
  },
];

/**
 * 处理查看更多按钮点击
 */
const handleMore = () => {
  Message.info('查看更多');
};

/**
 * 图片卡片类型定义
 */
interface ImageCardItem {
  category: string;
  comments: number;
  date: string;
  id: number;
  imageUrl: string;
  readTime: string;
  title: string;
  views: number;
}

/**
 * 处理图片卡片点击事件
 * @param card 卡片数据
 */
const handleImageCardClick = (card: ImageCardItem) => {
  console.warn('点击卡片:', card);
};
</script>

<template>
  <Page title="卡片示例">
    <Card class="mb-4" title="统计卡片（文字）">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in statsCards"
          :key="card.id"
          class="mb-5"
        >
          <StatsCard
            :icon="card.icon"
            :icon-style="card.iconStyle"
            :title="card.title"
            :description="card.description"
            :show-arrow="card.showArrow"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="统计卡片（数字滚动）">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in statsCards"
          :key="card.id"
          class="mb-5"
        >
          <StatsCard
            :icon="card.icon"
            :icon-style="card.iconStyle"
            :count="card.count"
            :description="card.description"
            :decimals="0"
            :show-arrow="card.showArrow"
            separator=","
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="统计卡片（自定义样式）">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in statsCards"
          :key="card.id"
          class="mb-5"
        >
          <StatsCard
            :icon="card.icon"
            :icon-style="card.customIconStyle"
            :box-style="card.boxStyle"
            :title="card.title"
            :description="card.description"
            :text-color="card.textColor"
            :show-arrow="card.showArrow"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="进度卡片">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in progressCards"
          :key="card.id"
          class="mb-5"
        >
          <ProgressCard
            :percentage="card.percentage"
            :title="card.title"
            :color="card.color"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="进度卡片（icon）">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in progressCards"
          :key="card.id"
          class="mb-5"
        >
          <ProgressCard
            :percentage="card.percentage"
            :title="card.title"
            :color="card.color"
            :icon="card.icon"
            :icon-style="card.iconStyle"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="图表卡片（小图表）">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <LineChartCard
            :is-mini-chart="true"
            :value="2545"
            label="新用户"
            date="过去7天"
            :percentage="1.2"
            :height="9.5"
            :chart-data="[120, 132, 101, 134, 90, 230, 210]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <BarChartCard
            :is-mini-chart="true"
            :value="15480"
            label="浏览量"
            date="过去 14 天"
            :percentage="-4.15"
            :height="9.5"
            bar-width="45%"
            :chart-data="[120, 100, 150, 140, 90, 120, 130]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <LineChartCard
            :is-mini-chart="true"
            :value="2545"
            label="粉丝数"
            date="过去 30 天"
            :percentage="1.2"
            :height="9.5"
            :show-area-color="true"
            :chart-data="[150, 180, 160, 200, 180, 220, 240]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <DonutChartCard
            :value="36358"
            title="粉丝量"
            :percentage="18"
            percentage-label="较去年"
            :data="[50, 40]"
            :height="9.5"
            current-value="2022"
            previous-value="2021"
            :radius="['50%', '70%']"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="图表卡片（大图表）">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <LineChartCard
            :value="2545"
            label="新用户"
            :percentage="1.2"
            :height="11"
            :chart-data="[120, 132, 101, 134, 90, 230, 210]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <BarChartCard
            :value="15480"
            label="浏览量"
            :percentage="-4.15"
            :height="11"
            :chart-data="[120, 100, 150, 140, 90, 120, 130, 110]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <LineChartCard
            :value="2545"
            label="粉丝数"
            :percentage="1.2"
            :height="11"
            :show-area-color="true"
            :chart-data="[150, 180, 160, 200, 180, 220, 240]"
          />
        </Col>
        <Col :xs="24" :sm="12" :md="6" class="mb-5">
          <DonutChartCard
            :value="36358"
            title="粉丝量"
            :percentage="-18"
            percentage-lab="较2021年"
            :data="[70, 30]"
            :height="11"
            current-value="12月"
            previous-value="11月"
          />
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="数据列表卡片">
      <Row :gutter="20">
        <Col :xs="24" :sm="12" :lg="8" class="mb-5">
          <DataListCard
            :list="dataList"
            title="待办事项"
            subtitle="今日待处理任务"
          />
        </Col>
        <Col :xs="24" :sm="12" :lg="8" class="mb-5">
          <DataListCard
            :max-count="4"
            :list="dataList"
            title="最近活动"
            subtitle="近期活动列表"
            :show-more-button="true"
            @more="handleMore"
          />
        </Col>
        <Col :xs="24" :sm="12" :lg="8" class="mb-5">
          <TimelineListCard
            :list="timineData"
            title="最近交易"
            subtitle="2024年12月20日"
          >
            <Timeline>
              <TimelineItem
                v-for="item in timineData"
                :key="item.time"
                :label="item.time"
                :dot-color="item.status"
              >
                <div class="flex-y-c gap-3">
                  <div class="flex-y-c gap-2">
                    <span class="text-sm">{{ item.content }}</span>
                    <span
                      v-if="item.code"
                      class="text-sm text-[hsl(var(--primary))]"
                    >
                      #{{ item.code }}
                    </span>
                  </div>
                </div>
              </TimelineItem>
            </Timeline>
          </TimelineListCard>
        </Col>
      </Row>
    </Card>

    <Card class="mb-4" title="图片卡片">
      <Row :gutter="20">
        <Col
          :xs="24"
          :sm="12"
          :md="6"
          v-for="card in imageCards"
          :key="card.id"
          class="mb-5"
        >
          <ImageCard
            :image-url="card.imageUrl"
            :title="card.title"
            :category="card.category"
            :read-time="card.readTime"
            :views="card.views"
            :comments="card.comments"
            :date="card.date"
            @click="handleImageCardClick(card)"
          />
        </Col>
      </Row>
    </Card>
  </Page>
</template>

<style scoped>
.page-title {
  @apply my-5 text-xl font-medium first:mt-0;
}
</style>
