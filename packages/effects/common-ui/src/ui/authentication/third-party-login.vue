<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:47:53
 * @LastEditTime: 2025-08-18 10:08:33
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useAppConfig } from '@qin/hooks';
import {
  SvgGithubIcon,
  SvgGoogleIcon,
  SvgQQChatIcon,
  SvgWeChatIcon,
} from '@qin/icons';
import { $t } from '@qin/locales';

import { QinIconButton } from '@qin-core/shadcn-ui';

import DingdingLogin from './dingding-login.vue';

defineOptions({
  name: 'ThirdPartyLogin',
});

const {
  auth: { dingding: dingdingAuthConfig },
} = useAppConfig(import.meta.env, import.meta.env.PROD);
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
      <span class="text-muted-foreground text-center text-xs uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <QinIconButton
        :tooltip="$t('authentication.wechatLogin')"
        class="mb-3"
        tooltip-side="top"
      >
        <SvgWeChatIcon />
      </QinIconButton>
      <QinIconButton
        :tooltip="$t('authentication.qqLogin')"
        class="mb-3"
        tooltip-side="top"
      >
        <SvgQQChatIcon />
      </QinIconButton>
      <QinIconButton
        :tooltip="$t('authentication.githubLogin')"
        class="mb-3"
        tooltip-side="top"
      >
        <SvgGithubIcon />
      </QinIconButton>
      <QinIconButton
        :tooltip="$t('authentication.googleLogin')"
        class="mb-3"
        tooltip-side="top"
      >
        <SvgGoogleIcon />
      </QinIconButton>
      <DingdingLogin
        v-if="dingdingAuthConfig"
        :client-id="dingdingAuthConfig.clientId"
        :corp-id="dingdingAuthConfig.corpId"
        class="mb-3"
      />
    </div>
  </div>
</template>
