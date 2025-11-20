<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:05:18
 * @LastEditTime: 2025-07-31 23:22:19
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@qin/common-ui';

import { Button, Message } from '@arco-design/web-vue';

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
    { title: '序号', type: 'seq', width: 50 },
    { editRender: { name: 'input' }, field: 'category', title: 'Category' },
    { editRender: { name: 'input' }, field: 'color', title: 'Color' },
    {
      editRender: { name: 'input' },
      field: 'productName',
      title: 'Product Name',
    },
    { field: 'price', title: 'Price' },
    { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
    { slots: { default: 'action' }, title: '操作' },
  ],
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
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
  showOverflow: true,
};

const [Grid, gridApi] = useQinVxeGrid({ gridOptions });

function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  gridApi.grid?.setEditRow(row);
}

async function saveRowEvent(row: RowType) {
  await gridApi.grid?.clearEdit();

  gridApi.setLoading(true);
  try {
    // Simulate async save operation
    await new Promise((resolve) => setTimeout(resolve, 600));
    gridApi.setLoading(false);
    Message.success({
      content: `保存成功！ category=${row.category}`,
    });
  } catch {
    gridApi.setLoading(false);
    Message.error({
      content: '保存失败！',
    });
  }
}

const cancelRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <Button type="text" @click="saveRowEvent(row)">保存</Button>
          <Button type="text" @click="cancelRowEvent(row)">取消</Button>
        </template>
        <template v-else>
          <Button type="text" @click="editRowEvent(row)">编辑</Button>
        </template>
      </template>
    </Grid>
  </Page>
</template>
