<script lang="ts" setup>
import { Page, useQinModal } from '@qin/common-ui';

import { Button, Card } from 'tdesign-vue-next';

import { useQinForm } from '#/adapter/form';
import { message } from '#/adapter/tdesign';
import MenuAPI from '#/api/core/menu';

import modalDemo from './modal.vue';

const [Form, formApi] = useQinForm({
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleSubmit: (values) => {
    message.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: {
        // 菜单接口转options格式
        afterFetch: (data: { name: string; path: string }[]) => {
          return data.map((item: any) => ({
            label: item.name,
            value: item.path,
          }));
        },
        // 菜单接口
        api: MenuAPI.getMenusApi,
      },
      // 字段名
      fieldName: 'api',
      // 界面显示的label
      label: 'ApiSelect',
      rules: 'required',
    },
    // {
    //   component: 'ApiTreeSelect',
    //   // 对应组件的参数
    //   componentProps: {
    //     // 菜单接口
    //     api: MenuAPI.getMenusApi,
    //     childrenField: 'children',
    //     // 菜单接口转options格式
    //     labelField: 'name',
    //     valueField: 'path',
    //   },
    //   // 字段名
    //   fieldName: 'apiTree',
    //   // 界面显示的label
    //   label: 'ApiTreeSelect',
    //   rules: 'required',
    // },
    {
      component: 'Input',
      fieldName: 'string',
      label: 'String',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'number',
      label: 'Number',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radio',
      label: 'Radio',
      componentProps: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radioButton',
      label: 'RadioButton',
      componentProps: {
        isButton: true,
        class: 'flex flex-wrap', // 如果选项过多，可以添加class来自动折叠
        options: [
          { value: 'A', label: '选项A' },
          { value: 'B', label: '选项B' },
          { value: 'C', label: '选项C' },
          { value: 'D', label: '选项D' },
          { value: 'E', label: '选项E' },
        ],
        theme: 'button',
      },
      rules: 'selectRequired',
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbox',
      label: 'Checkbox',
      componentProps: {
        options: [
          { label: '全选', checkAll: true },
          { value: 'A', label: '选项A' },
          { value: 'B', label: '选项B' },
          { value: 'C', label: '选项C' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'DatePicker',
      fieldName: 'date',
      label: 'Date',
      rules: 'required',
    },
    {
      component: 'Textarea',
      fieldName: 'textArea',
      label: 'TextArea',
      componentProps: {
        type: 'textarea',
      },
      rules: 'required',
    },
  ],
});
function setFormValues() {
  formApi.setValues({
    string: 'string',
    number: 123,
    radio: 'B',
    radioButton: 'C',
    checkbox: ['A', 'C'],
    date: Date.now(),
  });
}

const [Modal, modalApi] = useQinModal({
  connectedComponent: modalDemo,
});
</script>
<template>
  <Page
    description="表单适配器重新包装了CheckboxGroup和RadioGroup，可以通过options属性传递选项数据（选项数据将作为子组件的属性）"
    title="表单演示"
  >
    <Card title="基础表单">
      <template #header-extra>
        <Button theme="primary" @click="setFormValues">设置表单值</Button>
        <Button class="ml-2" theme="primary" @click="modalApi.open()">
          打开弹窗
        </Button>
      </template>
      <Form />
    </Card>
    <Modal />
  </Page>
</template>
