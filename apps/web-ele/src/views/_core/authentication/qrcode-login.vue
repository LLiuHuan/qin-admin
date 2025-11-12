<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-27 15:37:00
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@qin/common-ui';
import { LOGIN_PATH } from '@qin/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
