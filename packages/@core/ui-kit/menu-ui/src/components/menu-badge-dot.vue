<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface Props {
  dotClass?: string;
  dotStyle?: CSSProperties;
}

withDefaults(defineProps<Props>(), {
  dotClass: '',
  dotStyle: () => ({}),
});
</script>
<template>
  <span class="relative mr-1 flex size-1.5">
    <span
      :class="dotClass"
      :style="dotStyle"
      class="wh-full absolute inline-flex animate-ping rounded-full opacity-75"
    >
    </span>
    <span
      :class="dotClass"
      :style="dotStyle"
      class="relative inline-flex size-1.5 rounded-full"
    ></span>
  </span>
</template>
