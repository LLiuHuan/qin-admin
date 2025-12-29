<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-12-29 15:02:23
 * @LastEditTime: 2025-12-29 16:54:41
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { ImageCaptchaProps } from '../types';

import { Input } from '@qin-core/shadcn-ui';

// import { useVModel } from '@vueuse/core';

const props = withDefaults(defineProps<ImageCaptchaProps>(), {
  modelValue: () => ['', ''],
  captchaImage: '',
  height: '40px',
  width: '100px',
});

const emits = defineEmits<{
  (e: 'change', payload: [number | string, string]): void;
  (e: 'resetCaptcha'): void;
}>();

const resetCaptcha = () => {
  emits('resetCaptcha');
};

function onChange() {
  emits('change', props.modelValue);
}
</script>

<template>
  <div class="flex w-full">
    <Input
      v-model="modelValue[0]"
      placeholder="请输入验证码"
      class="qin-input mr-2 flex-auto"
      @change="onChange"
    />

    <img
      :src="captchaImage"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }"
      alt="验证码"
      @click="resetCaptcha"
    />
  </div>
</template>

<style lang="less" scoped></style>
