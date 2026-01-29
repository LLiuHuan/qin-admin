<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2026-01-08 18:45:29
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, markRaw } from 'vue';

import { useAuthStore } from '#/store';
import type { QinFormSchema } from '@qin/common-ui';
import { AuthenticationLogin, SliderCaptcha, z } from '@qin/common-ui';
import { $t } from '@qin/locales';
import type { BasicOption } from '@qin/types';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'super',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];

const formSchema = computed((): QinFormSchema[] => {
  return [
    {
      component: 'QinSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: markRaw(
        z
          .string()
          .min(1, { error: $t('authentication.selectAccount') })
          .default('super')
          .optional(),
      ),
    },
    {
      component: 'QinInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: '123456',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: markRaw(
        z.string().min(1, { error: $t('authentication.usernameTip') }),
      ),
    },
    {
      component: 'QinInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: markRaw(
        z.string().min(1, { error: $t('authentication.passwordTip') }),
      ),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: markRaw(
        z.boolean().refine((value) => value, {
          error: $t('authentication.verifyRequiredTip'),
        }),
      ),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
