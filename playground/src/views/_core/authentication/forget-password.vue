<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2026-01-08 18:47:17
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, markRaw, ref } from 'vue';

import type { QinFormSchema } from '@qin/common-ui';
import { AuthenticationForgetPassword, z } from '@qin/common-ui';
import { $t } from '@qin/locales';
import type { Recordable } from '@qin/types';

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
            rules: markRaw(
        z
          .string()
          .min(1, { error: $t('authentication.emailTip') })
          .email({ error: $t('authentication.emailValidErrorTip') }),
      ),
    },
  ];
});

function handleSubmit(value: Recordable<any>) {
  loading.value = true;
  // eslint-disable-next-line no-console
  console.log('reset email:', value);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}
</script>

<template>
  <AuthenticationForgetPassword
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
