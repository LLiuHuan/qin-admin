<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-12-31 13:51:33
 * @LastEditTime: 2026-01-23 10:44:56
 * @LastEditors: LLiuHuan
-->
<!-- 基础表格 -->
<script setup lang="ts">
import { Page } from '@qin/common-ui';
import { IconifyIcon } from '@qin/icons';

import {
  ElAvatar,
  ElButton,
  ElCard,
  ElIcon,
  ElTag,
  ElTooltip,
} from 'element-plus';

import { useQinForm } from '#/adapter/form';
import { TableAPI } from '#/api';
import { QinTable, QinTableHeader } from '#/components';
import { useTable } from '#/hooks/useTable';

defineOptions({ name: 'UserMixedUsageExample' });

const onSubmit = (values: any) => {
  Object.assign(searchParams, { ...values });
  reload();
};

const [QueryForm] = useQinForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入角色名称',
      },
      // 字段名
      fieldName: 'keywords',
      // 界面显示的label
      label: '角色名称',
    },
  ],
  // 是否可展开
  // showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

const {
  data,
  loading,
  searchParams,
  reload,
  handleCurrentChange,
  handleSizeChange,
  pagination,
  columns, // 表格列配置
  columnChecks, // 列显示、拖拽配置
} = useTable({
  apiFn: TableAPI.getTableDataApi,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
  },
  paginationKey: {
    current: 'pageNum',
    size: 'pageSize',
    total: 'total',
  },
  responseKey: {
    data: 'list',
    total: 'total',
  },
  columnsFactory: () => [
    { type: 'selection', width: 50 },
    // { type: 'index', width: 60, label: '序号' }, // 本地序号列
    { type: 'globalIndex', width: 100, label: '序号' }, // 全局序号列
    {
      prop: 'name',
      label: '用户信息',
      minWidth: 200,
      useSlot: true,
      useHeaderSlot: true,
      sortable: false,
      // visible: false, // 隐藏列
    },
    {
      prop: 'phone',
      label: '手机号',
      useHeaderSlot: true,
      sortable: true,
    },
    {
      prop: 'gender',
      label: '性别',
      sortable: true,
    },
    {
      prop: 'email',
      label: '邮箱',
      sortable: true,
    },
    {
      prop: 'status',
      label: '状态',
      useSlot: true,
      sortable: true,
    },
    {
      prop: 'operation',
      label: '操作',
      width: 180,
      useSlot: true,
      fixed: 'right',
    },
  ],
});
</script>

<template>
  <Page>
    <div class="user-page art-full-height">
      <ElCard class="table-card mb-4" shadow="never">
        <!-- 查询表单 -->
        <QueryForm />
      </ElCard>

      <ElCard class="table-card" shadow="never" style="margin-top: 0">
        <QinTableHeader
          v-model:columns="columnChecks"
          :loading="loading"
          layout="refresh,size,fullscreen,columns,settings"
        />
        <!-- 表格 -->
        <QinTable
          row-key="id"
          table-layout="auto"
          :show-table-header="false"
          :loading="loading"
          :data="data"
          :columns="columns"
          :pagination="pagination"
          @pagination-size-change="handleSizeChange"
          @pagination-current-change="handleCurrentChange"
        >
          <!-- 用户信息列 -->
          <template #name="{ row }">
            <div class="user-info flex gap-3">
              <ElAvatar :src="row.avatar" :size="40" />
              <div class="min-w-0 flex-1">
                <p
                  class="m-0 overflow-hidden font-medium text-ellipsis whitespace-nowrap"
                >
                  {{ row.name }}
                </p>
                <p
                  class="text-g-700 m-0 mt-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap"
                >
                  {{ row.email }}
                </p>
              </div>
            </div>
          </template>

          <!-- 自定义用户信息表头 -->
          <template #name-header="{ column }">
            <div class="flex-c gap-1">
              <span>{{ column.label }}</span>
              <ElTooltip content="包含头像、姓名和邮箱" placement="top">
                <ElIcon>
                  <IconifyIcon icon="ri:question-fill" />
                </ElIcon>
              </ElTooltip>
            </div>
          </template>
          <!-- 状态列 -->
          <template #status="{ row }">
            <ElTag :type="row.status ? 'success' : 'info'">
              {{ row.status ? '启用' : '禁用' }}
            </ElTag>
          </template>
          <!-- 操作列 -->
          <template #operation="{ row }">
            <div class="flex">
              <ElButton
                size="small"
                @click="
                  () => {
                    console.log(row);
                  }
                "
              >
                编辑
              </ElButton>
            </div>
          </template>
        </QinTable>
      </ElCard>
    </div>
  </Page>
</template>
