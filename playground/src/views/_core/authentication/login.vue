<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2026-01-05 18:19:35
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, markRaw, ref, useTemplateRef } from 'vue';

import AuthAPI from '#/api/core/auth';
import { useAuthStore } from '#/store';
import type { QinFormSchema } from '@qin/common-ui';
import { AuthenticationLogin, ImageCaptcha, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const captcha = ref('');
const authFormRef = useTemplateRef('authFormRef');

const resetCaptcha = async () => {
  // 随机0-4之间的数字
  const res = await AuthAPI.getCaptchaApi();
  // console.log(res);

  const formApi = authFormRef.value?.getFormApi();

  // captchaId.value = res?.id;
  const values = await formApi?.getValues();
  captcha.value = res?.captchaBase64;
  formApi?.setFieldValue('captchaImg', [values?.captcha, res?.captchaKey]);
};

const formSchema = computed((): QinFormSchema[] => {
  return [
    {
      component: 'QinInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
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
      component: markRaw(ImageCaptcha),
      defaultValue: ['', ''],
      componentProps: {
        captchaImage: captcha.value,
        onResetCaptcha: resetCaptcha,
      },
      fieldName: 'captchaImg',
      // rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
  ];
});

resetCaptcha();
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
