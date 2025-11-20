<script lang="ts" setup>
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';

import { useId } from 'vue';

import { useForwardPropsEmits } from 'reka-ui';

import { Checkbox } from '../../ui/checkbox';

const props = defineProps<CheckboxRootProps & { indeterminate?: boolean }>();

const emits = defineEmits<CheckboxRootEmits>();

const checked = defineModel<boolean>();

const forwarded = useForwardPropsEmits(props, emits);

const id = useId();
</script>

<template>
  <div class="flex items-center">
    <Checkbox :id="id" v-model="checked" v-bind="forwarded" />
    <label :for="id" class="ml-2 cursor-pointer text-sm"> <slot></slot> </label>
  </div>
</template>
