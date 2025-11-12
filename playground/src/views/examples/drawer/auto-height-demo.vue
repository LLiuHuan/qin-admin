<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 20:19:07
 * @LastEditTime: 2025-07-31 20:19:45
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ref } from 'vue';

import { useQinDrawer } from '@qin/common-ui';

import { Button, Message } from '@arco-design/web-vue';

const list = ref<number[]>([]);

const [Drawer, drawerApi] = useQinDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // drawerApi.close();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      handleUpdate(10);
    }
  },
});

function handleUpdate(len: number) {
  drawerApi.setState({ loading: true });
  setTimeout(() => {
    list.value = Array.from({ length: len }, (_v, k) => k + 1);
    drawerApi.setState({ loading: false });
  }, 2000);
}
</script>
<template>
  <Drawer title="自动计算高度">
    <div
      v-for="item in list"
      :key="item"
      class="even:bg-heavy bg-muted flex-center h-[220px] w-full"
    >
      {{ item }}
    </div>

    <template #prepend-footer>
      <Button type="text" @click="handleUpdate(6)">点击更新数据</Button>
    </template>
  </Drawer>
</template>
