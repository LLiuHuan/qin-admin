<script lang="ts" setup>
import type { FileItem } from '@arco-design/web-vue/es';

import { h, ref, toRaw } from 'vue';

import { Page } from '@qin/common-ui';

import { Button, Card, Message, Spin, Tag } from '@arco-design/web-vue';
import { useDebounceFn } from '@vueuse/core';
import dayjs from 'dayjs';

import { useQinForm, z } from '#/adapter/form';
import MenuAPI from '#/api/core/menu';
import DocButton from '#/components/DocButton/index.vue';
// import { upload_file } from '#/api/examples/upload';
import { $t } from '#/locales';

const keyword = ref('');
const fetching = ref(false);
// 模拟远程获取数据
function fetchRemoteOptions({ keyword = '选项' }: Record<string, any>) {
  fetching.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = Array.from({ length: 10 }).map((_, index) => ({
        label: `${keyword}-${index}`,
        value: `${keyword}-${index}`,
      }));
      resolve(options);
      fetching.value = false;
    }, 1000);
  });
}

const [BaseForm, baseFormApi] = useQinForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,
  handleValuesChange(_values, fieldsChanged) {
    Message.info(`表单以下字段发生变化：${fieldsChanged.join('，')}`);
  },

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入用户名',
      },
      // 字段名
      fieldName: 'username',
      // 界面显示的label
      label: '字符串',
      rules: 'required',
    },
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
        autoSelect: 'first',
      },
      // 字段名
      fieldName: 'api',
      // 界面显示的label
      label: 'ApiSelect',
    },
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: () => {
        return {
          api: fetchRemoteOptions,
          // 禁止本地过滤
          filterOption: false,
          // 如果正在获取数据，使用插槽显示一个loading
          notFoundContent: fetching.value ? undefined : null,
          // 搜索词变化时记录下来， 使用useDebounceFn防抖。
          onSearch: useDebounceFn((value: string) => {
            keyword.value = value;
          }, 300),
          // 远程搜索参数。当搜索词变化时，params也会更新
          params: {
            keyword: keyword.value || undefined,
          },
          showSearch: true,
        };
      },
      // 字段名
      fieldName: 'remoteSearch',
      // 界面显示的label
      label: '远程搜索',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'ApiTreeSelect',
      // 对应组件的参数
      componentProps: {
        // 菜单接口
        api: MenuAPI.getMenusApi,
        // 菜单接口转options格式
        labelField: 'name',
        valueField: 'path',
        childrenField: 'children',
      },
      // 字段名
      fieldName: 'apiTree',
      // 界面显示的label
      label: 'ApiTreeSelect',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'number',
      label: '数字(带后缀)',
      renderComponentContent: () => {
        return {
          append: () => '¥',
        };
      },
    },
    {
      component: 'IconPicker',
      fieldName: 'icon',
      label: '图标',
    },
    {
      colon: false,
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'options',
      label: () => h(Tag, { color: 'orangered' }, () => '😎自定义：'),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
      fieldName: 'radioGroup',
      label: '单选组',
    },
    {
      component: 'Radio',
      fieldName: 'radio',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['Radio'],
        };
      },
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        name: 'cname',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
      fieldName: 'checkboxGroup',
      label: '多选组',
    },
    {
      component: 'Checkbox',
      fieldName: 'checkbox',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['我已阅读并同意'],
        };
      },
      rules: z
        .boolean()
        .refine((v) => v, { message: '为什么不同意？勾上它！' }),
    },
    {
      component: 'Mention',
      componentProps: {
        data: [
          {
            label: 'afc163',
            value: 'afc163',
          },
          {
            label: 'zombieJ',
            value: 'zombieJ',
          },
        ],
        placeholder: '请输入',
      },
      fieldName: 'mention',
      label: '提及',
    },
    {
      component: 'Rate',
      fieldName: 'rate',
      label: '评分',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      fieldName: 'switch',
      help: () =>
        ['这是一个多行帮助信息', '第二行', '第三行'].map((v) => h('p', v)),
      label: '开关',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: '日期选择框',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: '范围选择器',
    },
    {
      component: 'TimePicker',
      fieldName: 'timePicker',
      label: '时间选择框',
    },
    {
      component: 'TreeSelect',
      componentProps: {
        allowClear: true,
        placeholder: '请选择',
        allowSearch: true,
        labelInValue: true,
        data: [
          {
            title: 'root 1',
            key: 'root 1',
            children: [
              {
                title: 'parent 1',
                key: 'parent 1',
                children: [
                  {
                    title: 'parent 1-0',
                    key: 'parent 1-0',
                    children: [
                      {
                        title: 'my leaf',
                        key: 'leaf1',
                      },
                      {
                        title: 'your leaf',
                        key: 'leaf2',
                      },
                    ],
                  },
                  {
                    title: 'parent 1-1',
                    key: 'parent 1-1',
                  },
                ],
              },
              {
                title: 'parent 2',
                key: 'parent 2',
              },
            ],
          },
        ],
      },
      fieldName: 'treeSelect',
      label: '树选择',
    },
    {
      component: 'Upload',
      componentProps: {
        // 更多属性见：https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        // 自动携带认证信息
        // customRequest: upload_file,
        disabled: false,
        maxCount: 1,
        multiple: false,
        showUploadList: true,
        // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
        listType: 'picture-card',
      },
      fieldName: 'files',
      label: $t('examples.form.file'),
      renderComponentContent: () => {
        return {
          default: () => $t('examples.form.upload-image'),
        };
      },
      rules: 'required',
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  const files = toRaw(values.files) as FileItem[];
  const doneFiles = files.filter((file) => file.status === 'done');
  const failedFiles = files.filter((file) => file.status !== 'done');

  const msg = [
    ...doneFiles.map((file) => file.response?.url || file.url),
    ...failedFiles.map((file) => file.name),
  ].join(', ');

  if (failedFiles.length === 0) {
    Message.success({
      content: `${$t('examples.form.upload-urls')}: ${msg}`,
    });
  } else {
    Message.error({
      content: `${$t('examples.form.upload-error')}: ${msg}`,
    });
    return;
  }
  // 如果需要可提交前替换为需要的urls
  values.files = doneFiles.map((file) => file.response?.url || file.url);
  Message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function handleSetFormValue() {
  /**
   * 设置表单值(多个)
   */
  baseFormApi.setValues({
    checkboxGroup: ['1'],
    datePicker: dayjs('2022-01-01'),
    files: [
      {
        name: 'example.png',
        status: 'done',
        uid: '-1',
        url: 'https://unpkg.com/arco-static@0.0.4/source/avatar-v2.webp',
      },
    ],
    mentions: '@afc163',
    number: 3,
    options: '1',
    password: '2',
    radioGroup: '1',
    rangePicker: [dayjs('2022-01-01'), dayjs('2022-01-02')],
    rate: 3,
    switch: true,
    timePicker: dayjs('2022-01-01 12:00:00'),
    treeSelect: 'leaf1',
    username: '1',
  });

  // 设置单个表单值
  baseFormApi.setFieldValue('checkbox', true);
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="表单组件基础示例，请注意，该页面用到的参数代码会添加一些简单注释，方便理解，请仔细查看。"
    title="表单组件"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>
          表单组件基础示例，请注意，该页面用到的参数代码会添加一些简单注释，方便理解，请仔细查看。
        </p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/arco-form" />
    </template>
    <Card title="基础示例">
      <template #extra>
        <Button type="primary" @click="handleSetFormValue">设置表单值</Button>
      </template>
      <BaseForm />
    </Card>
  </Page>
</template>
