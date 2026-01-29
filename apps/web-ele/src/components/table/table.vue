<!-- 表格组件 -->
<!-- 支持：el-table 全部属性、事件、插槽，同官方文档写法 -->
<!-- 扩展功能：分页组件、渲染自定义列、loading、表格全局边框、斑马纹、表格尺寸、表头背景配置 -->
<!-- 获取 ref：默认暴露了 elTableRef 外部通过 ref.value.elTableRef 可以调用 el-table 方法 -->
<script setup lang="ts">
// import type { ElTable } from 'element-plus';

import type { ColumnOption, PaginationOptions, QinTableProps } from './types';

import { computed, nextTick, ref, watchEffect } from 'vue';

import { useResizeObserver, useWindowSize } from '@vueuse/core';
import { ElEmpty, ElPagination, ElTable, ElTableColumn } from 'element-plus';
import { storeToRefs } from 'pinia';

import { useTableHeight } from '#/hooks/useTableHeight';
import { useTableStore } from '#/store/table';

defineOptions({ name: 'QinTable' });

const props = withDefaults(defineProps<QinTableProps>(), {
  columns: () => [],
  fit: true,
  showHeader: true,
  stripe: undefined,
  border: undefined,
  size: undefined,
  emptyHeight: '100%',
  emptyText: '暂无数据',
  showTableHeader: true,
  pagination: () => ({
    current: 1,
    size: 10,
    total: 0,
  }),
  paginationOptions: () => ({}),
  tableLayout: 'auto',
});
const emit = defineEmits<{
  (e: 'paginationSizeChange', val: number): void;
  (e: 'paginationCurrentChange', val: number): void;
}>();
const { width } = useWindowSize();
const elTableRef = ref<InstanceType<typeof ElTable> | null>(null);
const paginationRef = ref<HTMLElement>();
const tableHeaderRef = ref<HTMLElement>();
const tableStore = useTableStore();
const { isBorder, isZebra, tableSize, isFullScreen, isHeaderBackground } =
  storeToRefs(tableStore);
// const tableOptions = reactive({
//   isBorder: false,
//   isZebra: false,
//   tableSize: TableSizeEnum.DEFAULT,
//   isFullScreen: false,
//   isHeaderBackground: false,
// });

const LAYOUT = {
  MOBILE: 'prev, pager, next, sizes, jumper, total',
  IPAD: 'prev, pager, next, jumper, total',
  DESKTOP: 'total, prev, pager, next, sizes, jumper',
};

const layout = computed(() => {
  if (width.value < 768) {
    return LAYOUT.MOBILE;
  } else if (width.value < 1024) {
    return LAYOUT.IPAD;
  } else {
    return LAYOUT.DESKTOP;
  }
});

// 默认分页常量
const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  pageSizes: [10, 20, 30, 50, 100],
  align: 'center',
  background: true,
  layout: layout.value,
  hideOnSinglePage: false,
  size: 'default',
  pagerCount: width.value > 1200 ? 7 : 5,
};

// 合并分页配置
const mergedPaginationOptions = computed(() => ({
  ...DEFAULT_PAGINATION_OPTIONS,
  ...props.paginationOptions,
}));

// 边框 (优先级：props > store)
const border = computed(() => props.border ?? isBorder.value);
// 斑马纹
const stripe = computed(() => props.stripe ?? isZebra.value);
// 表格尺寸
const size = computed(() => props.size ?? tableSize.value);
// 数据是否为空
const isEmpty = computed(() => props.data?.length === 0);

const paginationHeight = ref(0);
const tableHeaderHeight = ref(0);

// 使用 useResizeObserver 监听分页器高度变化
useResizeObserver(paginationRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
    requestAnimationFrame(() => {
      paginationHeight.value = entry.contentRect.height;
    });
  }
});

// 使用 useResizeObserver 监听表格头部高度变化
useResizeObserver(tableHeaderRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
    requestAnimationFrame(() => {
      tableHeaderHeight.value = entry.contentRect.height;
    });
  }
});

// 分页器与表格之间的间距常量（计算属性，响应 showTableHeader 变化）
const PAGINATION_SPACING = computed(() => (props.showTableHeader ? 6 : 15));

// 使用表格高度计算 Hook
const { containerHeight } = useTableHeight({
  showTableHeader: computed(() => props.showTableHeader),
  paginationHeight,
  tableHeaderHeight,
  paginationSpacing: PAGINATION_SPACING,
});

// 表格高度逻辑
const height = computed(() => {
  // 全屏模式下占满全屏
  if (isFullScreen.value) return '100%';
  // 空数据且非加载状态时固定高度
  if (isEmpty.value && !props.loading) return props.emptyHeight;
  // 使用传入的高度
  if (props.height) return props.height;
  // 默认占满容器高度
  return '100%';
});

// 表头背景颜色样式
const headerCellStyle = computed(() => ({
  background: isHeaderBackground.value
    ? 'var(--el-fill-color-lighter)'
    : 'var(--default-box-color)',
  ...props.headerCellStyle, // 合并用户传入的样式
}));

// 是否显示分页器
const showPagination = computed(() => props.pagination && !isEmpty.value);

// 清理列属性，移除插槽相关的自定义属性，确保它们不会被 ElTableColumn 错误解释
const cleanColumnProps = (col: ColumnOption) => {
  const columnProps = { ...col };
  // 删除自定义的插槽控制属性
  delete columnProps.useHeaderSlot;
  delete columnProps.headerSlotName;
  delete columnProps.useSlot;
  delete columnProps.slotName;
  return columnProps;
};

// 分页大小变化
const handleSizeChange = (val: number) => {
  emit('paginationSizeChange', val);
};

// 分页当前页变化
const handleCurrentChange = (val: number) => {
  emit('paginationCurrentChange', val);
  scrollToTop(); // 页码改变后滚动到表格顶部
};

// 滚动表格内容到顶部，并可以联动页面滚动到顶部
const scrollToTop = () => {
  nextTick(() => {
    elTableRef.value?.setScrollTop(0); // 滚动 ElTable 内部滚动条到顶部
    const scrollContainer = document.querySelector('#app');
    scrollContainer && scrollContainer.scrollTo(0, 0);
  });
};

// 全局序号
const getGlobalIndex = (index: number) => {
  if (!props.pagination) return index + 1;
  const { current, size } = props.pagination;
  return (current - 1) * size + index + 1;
};

// 查找并绑定表格头部元素 - 使用 VueUse 优化
const findTableHeader = () => {
  if (!props.showTableHeader) {
    tableHeaderRef.value = undefined;
    return;
  }

  const tableHeader = document.querySelector('#qin-table-header');
  tableHeaderRef.value = tableHeader ? (tableHeader as HTMLElement) : undefined;
};

watchEffect(
  () => {
    // 访问响应式数据以建立依赖追踪
    void props.data?.length; // 追踪数据变化
    const shouldShow = props.showTableHeader;

    // 只有在需要显示表格头部时才查找
    if (shouldShow) {
      nextTick(() => {
        findTableHeader();
      });
    } else {
      // 不显示时清空引用
      tableHeaderRef.value = undefined;
    }
  },
  { flush: 'post' },
);

defineExpose({
  scrollToTop,
  elTableRef,
});
</script>

<template>
  <div
    class="qin-table"
    :class="{ 'is-empty': isEmpty }"
    :style="containerHeight"
  >
    <ElTable
      ref="elTableRef"
      v-loading="!!loading"
      v-bind="{
        ...$attrs,
        ...props,
        height,
        stripe,
        border,
        size,
        headerCellStyle,
      }"
    >
      <template v-for="col in columns" :key="col.prop || col.type">
        <!-- 渲染全局序号列 -->
        <ElTableColumn v-if="col.type === 'globalIndex'" v-bind="{ ...col }">
          <template #default="{ $index }">
            <span>{{ getGlobalIndex($index) }}</span>
          </template>
        </ElTableColumn>

        <!-- 渲染展开行 -->
        <ElTableColumn
          v-else-if="col.type === 'expand'"
          v-bind="cleanColumnProps(col)"
        >
          <template #default="{ row }">
            <component :is="col.formatter ? col.formatter(row) : null" />
          </template>
        </ElTableColumn>

        <!-- 渲染普通列 -->
        <ElTableColumn v-else v-bind="cleanColumnProps(col)">
          <template v-if="col.useHeaderSlot && col.prop" #header="headerScope">
            <slot
              :name="col.headerSlotName || `${col.prop}-header`"
              v-bind="{ ...headerScope, prop: col.prop, label: col.label }"
            >
              {{ col.label }}
            </slot>
          </template>
          <template v-if="col.useSlot && col.prop" #default="slotScope">
            <slot
              :name="col.slotName || col.prop"
              v-bind="{
                ...slotScope,
                prop: col.prop,
                value: col.prop ? slotScope.row[col.prop] : undefined,
              }"
            ></slot>
          </template>
        </ElTableColumn>
      </template>

      <template v-if="$slots.default" #default><slot></slot></template>

      <template #empty>
        <ElEmpty :description="emptyText" :image-size="120" />
      </template>
    </ElTable>

    <div
      class="pagination custom-pagination"
      v-if="showPagination"
      :class="mergedPaginationOptions?.align"
      ref="paginationRef"
    >
      <ElPagination
        v-bind="mergedPaginationOptions"
        :total="pagination?.total"
        :disabled="loading"
        :page-size="pagination?.size"
        :current-page="pagination?.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './style';
</style>
