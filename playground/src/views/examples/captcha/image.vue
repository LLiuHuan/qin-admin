<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-12-29 16:13:53
 * @LastEditTime: 2025-12-30 00:42:21
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { QinFormSchema } from '@qin/common-ui';
import type { BasicOption } from '@qin/types';

import { computed, markRaw, ref, useTemplateRef } from 'vue';

import { AuthenticationLogin, ImageCaptcha, Page, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

import { Card, Message } from '@arco-design/web-vue';

import CaptchaAPI from '#/api/examples/captcha';

const authFormRef = useTemplateRef('authFormRef');

const loading = ref(false);

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
    value: 'user',
  },
];

const captcha = ref('');

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
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('super'),
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
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'QinInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(ImageCaptcha),
      defaultValue: ['', ''],
      componentProps: {
        captchaImage: captcha.value,
        onResetCaptcha: resetCaptcha,
      },
      fieldName: 'captchaImg',
      // rules: z.number(),
    },
  ];
});

/**
 * 异步处理登录操作
 * Asynchronously handle the login process
 * @param params 登录表单数据
 */
async function authLogin(params: any, onSuccess?: () => Promise<void> | void) {
  Message.success(JSON.stringify(params));
  await resetCaptcha();
  onSuccess?.();
}

const resetCaptcha = async () => {
  // 随机0-4之间的数字
  const res = await CaptchaAPI.getCaptcha(Math.floor(Math.random() * 5));
  // console.log(res);

  const formApi = authFormRef.value?.getFormApi();

  // captchaId.value = res?.id;
  const values = await formApi?.getValues();
  captcha.value = res?.captcha;
  formApi?.setFieldValue('captchaImg', [values?.captcha, res?.id]);
};

resetCaptcha();
</script>

<template>
  <Page description="用于后端简单的图片校验场景" title="图片验证">
    <Card class="mb-5" title="基础示例">
      <AuthenticationLogin
        ref="authFormRef"
        :form-options="{
          fieldMappingTime: [['captchaImg', ['captcha', 'captchaId'], null]],
        }"
        :form-schema="formSchema"
        :loading="loading"
        @submit="authLogin"
      />
    </Card>
  </Page>
</template>
