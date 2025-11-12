<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-24 16:01:36
 * @LastEditTime: 2025-07-24 16:06:37
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinModal } from '@qin/common-ui';

import { Message } from '@arco-design/web-vue';

import { useQinForm } from '#/adapter/form';

defineOptions({
  name: 'FormModelDemo',
});

const [Form, formApi] = useQinForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'field1',
      label: '字段1',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'field2',
      label: '字段2',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
        placeholder: '请输入',
      },
      fieldName: 'field3',
      label: '字段3',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useQinModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: '内嵌表单示例',
});

function onSubmit(values: Record<string, any>) {
  Message.loading({
    content: '正在提交中...',
    duration: 0,
    id: 'is-form-submitting',
  });
  modalApi.lock();
  setTimeout(() => {
    modalApi.close();
    Message.success({
      content: `提交成功：${JSON.stringify(values)}`,
      duration: 2,
      id: 'is-form-submitting',
    });
  }, 3000);
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
