<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-24 16:01:36
 * @LastEditTime: 2025-07-24 16:04:05
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinModal } from '@qin/common-ui';

import { Button, Message } from '@arco-design/web-vue';

const [Modal, modalApi] = useQinModal({
  onCancel() {
    modalApi.close();
  },
  onClosed() {
    Message.info('onClosed：关闭动画结束');
  },
  onConfirm() {
    Message.info('onConfirm');
    // modalApi.close();
  },
  onOpened() {
    Message.info('onOpened：打开动画结束');
  },
});

function lockModal() {
  modalApi.lock();
  setTimeout(() => {
    modalApi.unlock();
  }, 3000);
}
</script>
<template>
  <Modal class="w-[600px]" title="基础弹窗示例" title-tooltip="标题提示内容">
    base demo
    <Button type="primary" @click="lockModal">锁定弹窗</Button>
  </Modal>
</template>
