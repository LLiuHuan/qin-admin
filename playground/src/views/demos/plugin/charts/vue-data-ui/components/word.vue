<script setup>
import { ref } from 'vue';
import { VueUiWordCloud } from 'vue-data-ui';

const config = ref({
  strictPixelPadding: true,
  table: {
    th: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
    td: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
  },
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
        borderColor: '#CCCCCC',
        backgroundOpacity: 70,
      },
      title: {
        text: 'Title',
        color: '#1A1A1A',
        textAlign: 'left',
        paddingLeft: 24,
        subtitle: {
          text: 'Subtitle',
        },
      },
      zoom: {
        show: false,
      },
      height: 300,
      width: 300,
    },
  },
});

const dataset = ref([
  {
    name: '编程',
    value: 255,
  },
  {
    name: '异步',
    value: 95,
  },
  {
    name: 'API',
    value: 93,
  },
  {
    name: '代码',
    value: 55,
  },
  {
    name: '服务器',
    value: 44,
  },
  {
    name: '编译',
    value: 29,
  },
  {
    name: '指针',
    value: 29,
  },
  {
    name: '条件',
    value: 28,
  },
  {
    name: '库',
    value: 27,
  },
  {
    name: '对象',
    value: 26,
  },
  {
    name: '请求',
    value: 26,
  },
  {
    name: '数组',
    value: 25,
  },
  {
    name: '字段',
    value: 25,
  },
  {
    name: '框架',
    value: 24,
  },
  {
    name: '接口',
    value: 23,
  },
  {
    name: '内存',
    value: 23,
  },
  {
    name: '变量',
    value: 22,
  },
  {
    name: '同步',
    value: 22,
  },
  {
    name: '模块',
    value: 21,
  },
  {
    name: '查询',
    value: 21,
  },
  {
    name: '队列',
    value: 20,
  },
  {
    name: '主函数',
    value: 20,
  },
  {
    name: '堆',
    value: 20,
  },
  {
    name: '哈希',
    value: 19,
  },
  {
    name: '算法',
    value: 18,
  },
  {
    name: '包',
    value: 18,
  },
  {
    name: '引用',
    value: 18,
  },
  {
    name: '事件',
    value: 17,
  },
  {
    name: '响应',
    value: 17,
  },
  {
    name: '类',
    value: 16,
  },
  {
    name: '递归',
    value: 16,
  },
  {
    name: '线程',
    value: 16,
  },
  {
    name: '调试',
    value: 15,
  },
  {
    name: '表',
    value: 15,
  },
  {
    name: '映射',
    value: 15,
  },
  {
    name: '栈',
    value: 14,
  },
  {
    name: '解释',
    value: 14,
  },
  {
    name: '合并',
    value: 14,
  },
  {
    name: '函数',
    value: 13,
  },
  {
    name: '循环',
    value: 13,
  },
  {
    name: '回调',
    value: 13,
  },
  {
    name: '排序',
    value: 13,
  },
  {
    name: '链表',
    value: 12,
  },
  {
    name: '异常',
    value: 12,
  },
  {
    name: '进程',
    value: 12,
  },
  {
    name: '过滤',
    value: 12,
  },
  {
    name: 'API',
    value: 12,
  },
  {
    name: '前端',
    value: 12,
  },
  {
    name: '多态',
    value: 11,
  },
  {
    name: '流程',
    value: 11,
  },
  {
    name: '继承',
    value: 10,
  },
]);
</script>
<template>
  <!-- Using a wrapper div is optional -->
  <div>
    <VueUiWordCloud :config="config" :dataset="dataset">
      <!-- SLOTS -->
    </VueUiWordCloud>
  </div>
</template>
