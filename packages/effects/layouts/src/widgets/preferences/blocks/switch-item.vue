<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-08-18 10:05:54
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { useSlots } from 'vue';

import { CircleHelp } from '@qin/icons';

import { QinTooltip, Switch } from '@qin-core/shadcn-ui';

defineOptions({
  name: 'PreferenceSwitchItem',
});

withDefaults(defineProps<{ disabled?: boolean; tip?: string }>(), {
  disabled: false,
  tip: '',
});

const modelValue = defineModel<boolean>();

const slots = useSlots();

function handleClick() {
  modelValue.value = !modelValue.value;
}
</script>

<template>
  <div
    :class="{
      'pointer-events-none opacity-50': disabled,
    }"
    class="hover:bg-accent my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5"
    @click="handleClick"
  >
    <span class="flex items-center text-sm">
      <slot></slot>

      <QinTooltip v-if="slots.tip || tip" side="bottom">
        <template #trigger>
          <CircleHelp class="ml-1 size-3 cursor-help" />
        </template>
        <slot name="tip">
          <template v-if="tip">
            <p v-for="(line, index) in tip.split('\n')" :key="index">
              {{ line }}
            </p>
          </template>
        </slot>
      </QinTooltip>
    </span>
    <span v-if="$slots.shortcut" class="ml-auto mr-2 text-xs opacity-60">
      <slot name="shortcut"></slot>
    </span>
    <Switch v-model="modelValue" @click.stop />
  </div>
</template>
