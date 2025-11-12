<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-08-18 10:17:33
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { QinFormSchema } from '@qin/common-ui';
import type { Recordable } from '@qin/types';

import { computed, ref } from 'vue';

import { AuthenticationForgetPassword, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

defineOptions({ name: 'ForgetPassword' });

const loading = ref(false);

const formSchema = computed((): QinFormSchema[] => {
  return [
    {
      component: 'QinInput',
      componentProps: {
        placeholder: 'example@example.com',
      },
      fieldName: 'email',
      label: $t('authentication.email'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.emailTip') })
        .email($t('authentication.emailValidErrorTip')),
    },
  ];
});

function handleSubmit(value: Recordable<any>) {
  // eslint-disable-next-line no-console
  console.log('reset email:', value);
}
</script>

<template>
  <AuthenticationForgetPassword
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
