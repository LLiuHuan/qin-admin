<script lang="ts" setup>
import { useQinModal } from '@qin/common-ui';

import { Button } from '@arco-design/web-vue';

import DragDemo from './drag-demo.vue';

const [Modal] = useQinModal({
  destroyOnClose: true,
});
const [BaseModal, baseModalApi] = useQinModal({
  connectedComponent: DragDemo,
});

function openNestedModal() {
  baseModalApi.open();
}
</script>
<template>
  <Modal title="嵌套弹窗示例">
    <Button @click="openNestedModal" type="primary">打开子弹窗</Button>
    <BaseModal />
  </Modal>
</template>
