<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:05:18
 * @LastEditTime: 2025-07-31 22:52:30
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@qin/common-ui';

import { Button } from '@arco-design/web-vue';

import { useQinVxeGrid } from '#/adapter/vxe-table';
import TableAPI from '#/api/examples/table';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { fixed: 'left', title: '序号', type: 'seq', width: 50 },
    { field: 'category', title: 'Category', width: 300 },
    { field: 'color', title: 'Color', width: 300 },
    { field: 'productName', title: 'Product Name', width: 300 },
    { field: 'price', title: 'Price', width: 300 },
    {
      field: 'releaseDate',
      formatter: 'formatDateTime',
      title: 'DateTime',
      width: 500,
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  height: 'auto',
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await TableAPI.list({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  rowConfig: {
    isHover: true,
  },
};

const [Grid] = useQinVxeGrid({ gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action>
        <Button type="text">编辑</Button>
      </template>
    </Grid>
  </Page>
</template>
