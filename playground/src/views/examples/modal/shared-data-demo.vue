<script lang="ts" setup>
import { ref } from 'vue';

import { useQinModal } from '@qin/common-ui';

import { Message } from '@arco-design/web-vue';

const data = ref();

const [Modal, modalApi] = useQinModal({
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = modalApi.getData<Record<string, any>>();
    }
  },
});
</script>
<template>
  <Modal title="数据共享示例">
    <div class="flex-col-center">外部传递数据： {{ data }}</div>
  </Modal>
</template>
