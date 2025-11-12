<script lang="ts" setup>
import type { Recordable } from '@qin/types';

import { reactive, ref } from 'vue';

import {
  Page,
  QinButton,
  QinButtonGroup,
  QinCheckButtonGroup,
} from '@qin/common-ui';
import { LoaderCircle, Square, SquareCheckBig } from '@qin/icons';

import { Button, Card, Message } from '@arco-design/web-vue';

import { useQinForm } from '#/adapter/form';

const radioValue = ref<string | undefined>('a');
const checkValue = ref(['a', 'b']);

const options = [
  { label: '选项1', value: 'a' },
  { label: '选项2', value: 'b', num: 999 },
  { label: '选项3', value: 'c' },
  { label: '选项4', value: 'd' },
  { label: '选项5', value: 'e' },
  { label: '选项6', value: 'f' },
];

function resetValues() {
  radioValue.value = undefined;
  checkValue.value = [];
}

function beforeChange(v: any, isChecked: boolean) {
  return new Promise((resolve) => {
    Message.loading({
      content: `正在设置${v}为${isChecked ? '选中' : '未选中'}...`,
      duration: 0,
      id: 'beforeChange',
    });
    setTimeout(() => {
      Message.success({ content: `${v} 已设置成功`, id: 'beforeChange' });
      resolve(true);
    }, 2000);
  });
}

const compProps = reactive({
  beforeChange: undefined,
  disabled: false,
  gap: 0,
  showIcon: true,
  size: 'middle',
  allowClear: false,
} as Recordable<any>);

const [Form] = useQinForm({
  handleValuesChange(values) {
    Object.keys(values).forEach((k) => {
      if (k === 'beforeChange') {
        compProps[k] = values[k] ? beforeChange : undefined;
      } else {
        compProps[k] = values[k];
      }
    });
  },
  commonConfig: {
    labelWidth: 150,
  },
  schema: [
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'middle' },
          { label: '小', value: 'small' },
        ],
      },
      defaultValue: compProps.size,
      fieldName: 'size',
      label: '尺寸',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '无', value: 0 },
          { label: '小', value: 5 },
          { label: '中', value: 15 },
          { label: '大', value: 30 },
        ],
      },
      defaultValue: compProps.gap,
      fieldName: 'gap',
      label: '间距',
    },
    {
      component: 'Switch',
      defaultValue: compProps.showIcon,
      fieldName: 'showIcon',
      label: '显示图标',
    },
    {
      component: 'Switch',
      defaultValue: compProps.disabled,
      fieldName: 'disabled',
      label: '禁用',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'beforeChange',
      label: '前置回调',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'allowClear',
      label: '允许清除',
      help: '单选时是否允许取消选中（值为undefined）',
    },
    {
      component: 'InputNumber',
      defaultValue: 0,
      fieldName: 'maxCount',
      label: '最大选中数量',
      help: '多选时有效，0表示不限制',
    },
  ],
  showDefaultActions: false,
  submitOnChange: true,
});

function onBtnClick(value: any) {
  const opt = options.find((o) => o.value === value);
  if (opt) {
    Message.success(`点击了按钮${opt.label}，value = ${value}`);
  }
}
</script>
<template>
  <Page
    title="QinButtonGroup 按钮组"
    description="QinButtonGroup是一个按钮容器，用于包裹一组按钮，协调整体样式。QinCheckButtonGroup则可以作为一个表单组件，提供单选或多选功能"
  >
    <Card title="基本用法">
      <template #extra>
        <Button type="primary" @click="resetValues">清空值</Button>
      </template>
      <p class="mt-4">按钮组：</p>
      <div class="mt-2 flex flex-col gap-2">
        <QinButtonGroup v-bind="compProps" border>
          <QinButton
            v-for="btn in options"
            :key="btn.value"
            variant="link"
            @click="onBtnClick(btn.value)"
          >
            {{ btn.label }}
          </QinButton>
        </QinButtonGroup>
        <QinButtonGroup v-bind="compProps" border>
          <QinButton
            v-for="btn in options"
            :key="btn.value"
            variant="outline"
            @click="onBtnClick(btn.value)"
          >
            {{ btn.label }}
          </QinButton>
        </QinButtonGroup>
      </div>
      <p class="mt-4">单选：{{ radioValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <QinCheckButtonGroup
          v-model="radioValue"
          :options="options"
          v-bind="compProps"
        />
      </div>
      <p class="mt-4">单选插槽：{{ radioValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <QinCheckButtonGroup
          v-model="radioValue"
          :options="options"
          v-bind="compProps"
        >
          <template #option="{ label, value, data }">
            <div class="flex items-center">
              <span>{{ label }}</span>
              <span class="ml-2 text-gray-400">{{ value }}</span>
              <span v-if="data.num" class="white ml-2">{{ data.num }}</span>
            </div>
          </template>
        </QinCheckButtonGroup>
      </div>
      <p class="mt-4">多选{{ checkValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <QinCheckButtonGroup
          v-model="checkValue"
          multiple
          :options="options"
          v-bind="compProps"
        />
      </div>
      <p class="mt-4">自定义图标{{ checkValue }}</p>
      <div class="mt-2 flex flex-col gap-2">
        <QinCheckButtonGroup
          v-model="checkValue"
          multiple
          :options="options"
          v-bind="compProps"
        >
          <template #icon="{ loading, checked }">
            <LoaderCircle class="animate-spin" v-if="loading" />
            <SquareCheckBig v-else-if="checked" />
            <Square v-else />
          </template>
        </QinCheckButtonGroup>
      </div>
    </Card>

    <Card title="设置" class="mt-4">
      <Form />
    </Card>
  </Page>
</template>
