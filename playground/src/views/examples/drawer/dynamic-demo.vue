<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 20:19:07
 * @LastEditTime: 2025-07-31 20:20:20
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useQinDrawer } from '@qin/common-ui';

import { Button, Message } from '@arco-design/web-vue';

const [Drawer, drawerApi] = useQinDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // drawerApi.close();
  },
  title: '动态修改配置示例',
});

// const state = drawerApi.useStore();

function handleUpdateTitle() {
  drawerApi.setState({ title: '内部动态标题' });
}
</script>
<template>
  <Drawer>
    <div class="flex-col-center">
      <Button class="mb-3" type="primary" @click="handleUpdateTitle()">
        内部动态修改标题
      </Button>
    </div>
  </Drawer>
</template>
