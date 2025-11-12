<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@qin/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@qin/common-ui';
import { preferences } from '@qin/preferences';
import { useUserStore } from '@qin/stores';
import { openWindow } from '@qin/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// 这是一个示例数据，实际项目中需要根据实际情况进行调整
// url 也可以是内部路由，在 navTo 方法中识别处理，进行内部跳转
// 例如：url: /dashboard/workspace
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: '开源连接世界，代码改变未来。',
    date: '2021-04-01',
    group: '开源组',
    icon: 'carbon:logo-github',
    title: 'Github',
    url: 'https://github.com',
  },
  {
    color: '#3fb27f',
    content: '组件化世界，响应式未来。',
    date: '2021-04-01',
    group: '前端体验组',
    icon: 'logos:vue',
    title: 'Vue',
    url: 'https://vuejs.org',
  },
  {
    color: '#007d9c',
    content: '简洁高效，并发为王，代码即诗。',
    date: '2021-04-01',
    group: '上班摸鱼',
    icon: 'devicon:go',
    title: 'Go',
    url: 'https://go.dev/',
  },
  {
    color: '#bf0c2c',
    content: '安全无虞，性能卓越，系统编程新境界。',
    date: '2021-04-01',
    group: '基础设施组',
    icon: 'catppuccin:rust',
    title: 'Rust',
    url: 'https://www.rust-lang.org/',
  },
  {
    color: '#00d8ff',
    content: '稳如磐石，行以致远。',
    date: '2021-04-01',
    group: '后端架构组',
    icon: 'devicon:java',
    title: 'Java',
    url: 'https://www.java.com/',
  },
  {
    color: '',
    content: '每一次提交，都是进步的足迹。',
    date: '2021-04-01',
    group: '协作组',
    icon: 'devicon:git',
    title: 'Git',
    url: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Git',
  },
];

// 同样，这里的 url 也可以使用以 http 开头的外部链接
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: '首页',
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: '仪表盘',
    url: '/dashboard',
  },
  {
    color: '#e18525',
    icon: 'ion:layers-outline',
    title: '组件',
    url: '/demos/features/icons',
  },
  {
    color: '#3fb27f',
    icon: 'ion:settings-outline',
    title: '系统管理',
    url: '/demos/features/login-expired', // 这里的 URL 是示例，实际项目中需要根据实际情况进行调整
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:key-outline',
    title: '权限管理',
    url: '/demos/access/page-control',
  },
  {
    color: '#00d8ff',
    icon: 'ion:bar-chart-outline',
    title: '图表',
    url: '/analytics',
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `审查最近提交到Git仓库的前端代码，确保代码质量和规范。`,
    date: '2024-07-30 11:00:00',
    title: '审查前端代码提交',
  },
  {
    completed: true,
    content: `检查并优化系统性能，降低CPU使用率。`,
    date: '2024-07-30 11:00:00',
    title: '系统性能优化',
  },
  {
    completed: false,
    content: `进行系统安全检查，确保没有安全漏洞或未授权的访问。 `,
    date: '2024-07-30 11:00:00',
    title: '安全检查',
  },
  {
    completed: false,
    content: `更新项目中的所有npm依赖包，确保使用最新版本。`,
    date: '2024-07-30 11:00:00',
    title: '更新项目依赖',
  },
  {
    completed: false,
    content: `修复用户报告的页面UI显示问题，确保在不同浏览器中显示一致。 `,
    date: '2024-07-30 11:00:00',
    title: '修复UI显示问题',
  },
]);
const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '刚刚',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '1个小时前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '1天前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '2天前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '3天前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '1周前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '1周前',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '2021-04-01 20:00',
    title: '乔布斯',
  },
  {
    avatar: 'svg:avatar-2',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '2021-03-01 20:00',
    title: '乔布斯',
  },
];

const router = useRouter();

// 这是一个示例方法，实际项目中需要根据实际情况进行调整
// This is a sample method, adjust according to the actual project requirements
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return ['早上好', '美好的一天开始了！'];
  } else if (hour >= 12 && hour < 18) {
    return ['下午好', '工作学习顺利！'];
  } else if (hour >= 18 && hour < 24) {
    return ['晚上好', '放松身心，享受夜晚！'];
  } else {
    return ['凌晨好', '注意休息，不要熬夜！']; // 0-5点
  }
}

// 提示词
const greeting = getGreeting();
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        {{ greeting[0] }} {{ userStore.userInfo?.realName }}，{{ greeting[1] }}
      </template>
      <template #description> 今日晴，20℃ - 32℃！ </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="项目" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="最新动态" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          title="快捷导航"
          @click="navTo"
        />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="待办事项" />
        <AnalysisChartCard class="mt-5" title="访问来源">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
