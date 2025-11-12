<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@qin/common-ui';

import { Card } from '@arco-design/web-vue';
import Player from 'xgplayer';

import DocButton from '#/components/DocButton/index.vue';

import 'xgplayer/dist/index.min.css';

const domRef = ref<HTMLElement>();
const player = ref<Player>();

function renderXgPlayer() {
  if (!domRef.value) return;
  const url =
    'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4';
  player.value = new Player({
    el: domRef.value,
    url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
  });
}
function destroyXgPlayer() {
  player.value?.destroy();
}

onMounted(() => {
  renderXgPlayer();
});

onUnmounted(() => {
  destroyXgPlayer();
});
</script>

<template>
  <Page
    description="一款带解析器、能节省流量的HTML5视频播放器"
    title="西瓜播放器"
  >
    <template #extra>
      <DocButton path="https://h5player.bytedance.com" text="查看官方文档" />
    </template>
    <Card class="card-wrapper h-full">
      <div class="flex-center">
        <div ref="domRef" class="h-auto w-full shadow-md"></div>
      </div>
    </Card>
  </Page>
</template>

<style scoped></style>
