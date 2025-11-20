<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-24 16:01:36
 * @LastEditTime: 2025-07-24 16:04:52
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinModal } from '@qin/common-ui';

import { Button, Message } from '@arco-design/web-vue';

const [Modal, modalApi] = useQinModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // modalApi.close();
  },
  title: '动态修改配置示例',
});

const state = modalApi.useStore();

function handleUpdateTitle() {
  modalApi.setState({ title: '内部动态标题' });
}

function handleToggleFullscreen() {
  modalApi.setState((prev) => {
    return { ...prev, fullscreen: !prev.fullscreen };
  });
}
</script>
<template>
  <Modal>
    <div class="flex-col-center">
      <Button class="mb-3" type="primary" @click="handleUpdateTitle()">
        内部动态修改标题
      </Button>
      <Button class="mb-3" type="primary" @click="handleToggleFullscreen()">
        {{ state.fullscreen ? '退出全屏' : '打开全屏' }}
      </Button>
    </div>
  </Modal>
</template>
