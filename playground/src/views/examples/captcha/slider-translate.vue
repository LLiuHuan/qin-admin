<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-21 01:24:51
 * @LastEditTime: 2025-07-24 01:02:56
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { Page, SliderTranslateCaptcha } from '@qin/common-ui';

import { Card, Message } from '@arco-design/web-vue';

function handleSuccess() {
  Message.success('success!');
}
</script>

<template>
  <Page
    description="用于前端简单的拼图滑块水平拖动校验场景"
    title="拼图滑块校验"
  >
    <Card class="mb-5" title="基本示例">
      <div class="flex items-center justify-center p-4">
        <SliderTranslateCaptcha
          src="https://unpkg.com/arco-static@0.0.4/source/avatar-v2.png"
          :canvas-width="420"
          :canvas-height="420"
          @success="handleSuccess"
        />
      </div>
    </Card>
  </Page>
</template>
