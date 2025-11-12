<script setup lang="ts">
import { computed } from 'vue';

import { Page, SliderRotateCaptcha } from '@qin/common-ui';
import { preferences } from '@qin/preferences';
import { useUserStore } from '@qin/stores';

import { Card, Message } from '@arco-design/web-vue';

const userStore = useUserStore();
function handleSuccess() {
  Message.success('success!');
}

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});
</script>

<template>
  <Page description="用于前端简单的拖动校验场景" title="滑块旋转校验">
    <Card class="mb-5" title="基本示例">
      <div class="flex items-center justify-center p-4">
        <SliderRotateCaptcha :src="avatar" @success="handleSuccess" />
      </div>
    </Card>
  </Page>
</template>
