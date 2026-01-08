<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2026-01-08 18:48:55
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, h, markRaw, ref } from 'vue';

import type { QinFormSchema } from '@qin/common-ui';
import { AuthenticationRegister, z } from '@qin/common-ui';
import { $t } from '@qin/locales';
import type { Recordable } from '@qin/types';

defineOptions({ name: 'Register' });

const loading = ref(false);

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
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      rules: markRaw(
        z.string().min(1, { error: $t('authentication.passwordTip') }),
      ),
    },
    {
      component: 'QinInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return markRaw(
            z
              .string()
              .min(1, $t('authentication.passwordTip'))
              .refine(
                (value) => value === password,
                $t('authentication.confirmPasswordTip'),
              ),
          );
        },
        triggerFields: ['password'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
    },
    {
      component: 'QinCheckbox',
      fieldName: 'agreePolicy',
      renderComponentContent: () => ({
        default: () =>
          h('span', [
            $t('authentication.agree'),
            h(
              'a',
              {
                class: 'qin-link ml-1 ',
                href: '',
              },
              `${$t('authentication.privacyPolicy')} & ${$t('authentication.terms')}`,
            ),
          ]),
      }),
      rules: markRaw(
        z.boolean().refine((value) => !!value, $t('authentication.agreeTip')),
      ),
    },
  ];
});

function handleSubmit(value: Recordable<any>) {
  // eslint-disable-next-line no-console
  console.log('register submit:', value);
}
</script>

<template>
  <AuthenticationRegister
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
