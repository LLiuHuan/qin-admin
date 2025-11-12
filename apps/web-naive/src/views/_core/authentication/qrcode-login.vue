<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 02:21:27
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
