<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 20:19:07
 * @LastEditTime: 2025-07-31 20:21:32
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ref } from 'vue';

import { useQinDrawer } from '@qin/common-ui';

import { Message } from '@arco-design/web-vue';

const data = ref();

const [Drawer, drawerApi] = useQinDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any>>();
    }
  },
});
</script>
<template>
  <Drawer title="数据共享示例">
    <div class="flex-col-center">外部传递数据： {{ data }}</div>
  </Drawer>
</template>
