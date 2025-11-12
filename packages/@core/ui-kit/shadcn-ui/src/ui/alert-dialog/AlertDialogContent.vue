<!--
 * @Description: dialog 内容
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-06-03 02:13:41
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui';

import type { ClassType } from '@qin-core/typings';

import { computed, ref } from 'vue';

import { cn } from '@qin-core/shared/utils';

import {
  AlertDialogContent,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';

import AlertDialogOverlay from './AlertDialogOverlay.vue';

const props = withDefaults(
  defineProps<
    AlertDialogContentProps & {
      appendTo?: HTMLElement | string;
      centered?: boolean;
      class?: ClassType;
      modal?: boolean;
      open?: boolean;
      overlayBlur?: number;
      zIndex?: number;
    }
  >(),
  { appendTo: 'body', modal: true },
);
const emits = defineEmits<
  AlertDialogContentEmits & { close: []; closed: []; opened: [] }
>();

const delegatedProps = computed(() => {
  const { class: _, modal: _modal, open: _open, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const contentRef = ref<InstanceType<typeof AlertDialogContent> | null>(null);
function onAnimationEnd(event: AnimationEvent) {
  // 只有在 contentRef 的动画结束时才触发 opened/closed 事件
  if (event.target === contentRef.value?.$el) {
    if (props.open) {
      emits('opened');
    } else {
      emits('closed');
    }
  }
}
defineExpose({
  getContentRef: () => contentRef.value,
});
</script>

<template>
  <AlertDialogPortal :to="appendTo">
    <Transition name="fade" appear>
      <AlertDialogOverlay
        v-if="open && modal"
        :style="{
          ...(zIndex ? { zIndex } : {}),
          position: 'fixed',
          backdropFilter:
            overlayBlur && overlayBlur > 0 ? `blur(${overlayBlur}px)` : 'none',
        }"
        @click="() => emits('close')"
      />
    </Transition>
    <AlertDialogContent
      ref="contentRef"
      :style="{ ...(zIndex ? { zIndex } : {}), position: 'fixed' }"
      @animationend="onAnimationEnd"
      v-bind="forwarded"
      :class="
        cn(
          'z-popup bg-background outline-hidden p-6 shadow-lg sm:rounded-xl',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          {
            'data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-top-[48%]':
              !centered,
            'data-[state=open]:slide-in-from-top-[98%] data-[state=closed]:slide-out-to-top-[148%]':
              centered,
            'top-[10vh]': !centered,
            'top-1/2 -translate-y-1/2': centered,
          },
          props.class,
        )
      "
    >
      <slot></slot>
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
