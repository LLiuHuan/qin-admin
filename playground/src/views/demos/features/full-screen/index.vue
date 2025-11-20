<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 04:04:57
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@qin/common-ui';

import { Button, Card } from '@arco-design/web-vue';
import { useFullscreen } from '@vueuse/core';

const domRef = ref<HTMLElement>();

const { enter, exit, isFullscreen, toggle } = useFullscreen();

const { isFullscreen: isDomFullscreen, toggle: toggleDom } =
  useFullscreen(domRef);
</script>

<template>
  <Page title="全屏示例">
    <Card title="Window Full Screen">
      <div class="flex flex-wrap items-center gap-4">
        <Button :disabled="isFullscreen" type="primary" @click="enter">
          进入窗口全屏模式
        </Button>
        <Button @click="toggle"> 切换窗口全屏模式 </Button>

        <Button :disabled="!isFullscreen" danger @click="exit">
          退出窗口全屏模式
        </Button>

        <span class="text-nowrap"> 当前状态: {{ isFullscreen }} </span>
      </div>
    </Card>

    <Card class="mt-5" title="Dom Full Screen">
      <Button type="primary" @click="toggleDom"> 进入Dom全屏模式 </Button>
    </Card>

    <div
      ref="domRef"
      class="mx-auto mt-10 flex h-64 w-1/2 items-center justify-center rounded-md bg-yellow-400"
    >
      <Button class="mr-2" type="primary" @click="toggleDom">
        {{ isDomFullscreen ? '退出Dom全屏模式' : '进入Dom全屏模式' }}
      </Button>
    </div>
  </Page>
</template>
