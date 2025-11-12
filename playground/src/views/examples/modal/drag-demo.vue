<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-24 16:01:36
 * @LastEditTime: 2025-07-24 16:04:23
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinModal } from '@qin/common-ui';

import { Message } from '@arco-design/web-vue';

const [Modal, modalApi] = useQinModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // modalApi.close();
  },
});
</script>
<template>
  <Modal title="可拖拽示例"> 鼠标移动到 header 上，可拖拽弹窗 </Modal>
</template>
