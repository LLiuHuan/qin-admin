<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 20:19:07
 * @LastEditTime: 2025-07-31 23:18:59
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinDrawer } from '@qin/common-ui';

import { useQinForm } from '#/adapter/form';

defineOptions({
  name: 'FormDrawerDemo',
});

const [Form, formApi] = useQinForm({
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
  ],
  showDefaultActions: false,
});
const [Drawer, drawerApi] = useQinDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    try {
      await formApi.submitForm();
      drawerApi.close();
    } catch (error) {
      // Form validation failed or submission error
      // Don't close drawer on error
      console.error('Form submission failed:', error);
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: '内嵌表单示例',
});
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
