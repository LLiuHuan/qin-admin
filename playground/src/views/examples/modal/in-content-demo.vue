<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-24 16:01:36
 * @LastEditTime: 2025-07-24 16:28:54
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ref } from 'vue';

import { useQinModal } from '@qin/common-ui';

import { Input, Message } from '@arco-design/web-vue';

const [Modal, modalApi] = useQinModal({
  destroyOnClose: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // modalApi.close();
  },
});
const value = ref();
</script>
<template>
  <Modal
    append-to-main
    class="w-[600px]"
    title="基础弹窗示例"
    title-tooltip="标题提示内容"
  >
    <div class="mb-2">
      此弹窗指定在内容区域打开，并且在关闭之后弹窗内容不会被销毁
    </div>
    <Input v-model:value="value" placeholder="KeepAlive测试" />
  </Modal>
</template>
