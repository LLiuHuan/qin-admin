<script lang="ts" setup>
import type { CaptchaPoint } from '@qin/common-ui';

import { reactive, ref } from 'vue';

import { Page, PointSelectionCaptcha } from '@qin/common-ui';

import {
  Card,
  Input,
  InputNumber,
  Message,
  Switch,
} from '@arco-design/web-vue';

import { $t } from '#/locales';

const DEFAULT_CAPTCHA_IMAGE =
  'https://unpkg.com/arco-static@0.0.5/source/default-captcha-image.jpeg';

const DEFAULT_HINT_IMAGE =
  'https://unpkg.com/arco-static@0.0.5/source/default-hint-image.png';

const selectedPoints = ref<CaptchaPoint[]>([]);
const params = reactive({
  captchaImage: '',
  captchaImageUrl: DEFAULT_CAPTCHA_IMAGE,
  height: undefined,
  hintImage: '',
  hintImageUrl: DEFAULT_HINT_IMAGE,
  hintText: '府，褥',
  paddingX: undefined,
  paddingY: undefined,
  showConfirm: true,
  showHintImage: false,
  title: '',
  width: undefined,
});
const handleConfirm = (points: CaptchaPoint[], clear: () => void) => {
  Message.success({
    content: `captcha points: ${JSON.stringify(points)}`,
  });
  clear();
  selectedPoints.value = [];
};
const handleRefresh = () => {
  selectedPoints.value = [];
};
const handleClick = (point: CaptchaPoint) => {
  selectedPoints.value.push(point);
};
</script>

<template>
  <Page
    :description="$t('examples.captcha.pageDescription')"
    :title="$t('examples.captcha.pageTitle')"
  >
    <Card :title="$t('examples.captcha.basic')" class="mb-4 overflow-x-auto">
      <div class="mb-3 flex items-center justify-start">
        <Input
          v-model="params.title"
          :placeholder="$t('examples.captcha.titlePlaceholder')"
          class="!w-64"
        />
        <Input
          v-model="params.captchaImageUrl"
          :placeholder="$t('examples.captcha.captchaImageUrlPlaceholder')"
          class="ml-8 !w-64"
        />
        <div class="ml-8 flex w-96 items-center">
          <Switch
            v-model="params.showHintImage"
            :checked-text="$t('examples.captcha.hintImage')"
            :unchecked-text="$t('examples.captcha.hintText')"
            class="w-30 mr-4"
          />
          <Input
            v-show="params.showHintImage"
            v-model="params.hintImageUrl"
            :placeholder="$t('examples.captcha.hintImagePlaceholder')"
          />
          <Input
            v-show="!params.showHintImage"
            v-model="params.hintText"
            :placeholder="$t('examples.captcha.hintTextPlaceholder')"
          />
        </div>

        <Switch
          v-model="params.showConfirm"
          :checked-text="$t('examples.captcha.showConfirm')"
          :unchecked-text="$t('examples.captcha.hideConfirm')"
          class="ml-8"
        />
      </div>
      <div class="mb-3 flex items-center justify-start">
        <div>
          <InputNumber
            v-model="params.width"
            :min="1"
            :placeholder="$t('examples.captcha.widthPlaceholder')"
            :precision="0"
            :step="1"
            class="w-64"
          >
            <template #addonAfter>px</template>
          </InputNumber>
        </div>
        <div class="ml-8">
          <InputNumber
            v-model="params.height"
            :min="1"
            :placeholder="$t('examples.captcha.heightPlaceholder')"
            :precision="0"
            :step="1"
            class="w-64"
          >
            <template #addonAfter>px</template>
          </InputNumber>
        </div>
        <div class="ml-8">
          <InputNumber
            v-model="params.paddingX"
            :min="1"
            :placeholder="$t('examples.captcha.paddingXPlaceholder')"
            :precision="0"
            :step="1"
            class="w-64"
          >
            <template #addonAfter>px</template>
          </InputNumber>
        </div>
        <div class="ml-8">
          <InputNumber
            v-model="params.paddingY"
            :min="1"
            :placeholder="$t('examples.captcha.paddingYPlaceholder')"
            :precision="0"
            :step="1"
            class="w-64"
          >
            <template #addonAfter>px</template>
          </InputNumber>
        </div>
      </div>

      <PointSelectionCaptcha
        :captcha-image="params.captchaImageUrl || params.captchaImage"
        :height="params.height || 220"
        :hint-image="
          params.showHintImage ? params.hintImageUrl || params.hintImage : ''
        "
        :hint-text="params.hintText"
        :padding-x="params.paddingX"
        :padding-y="params.paddingY"
        :show-confirm="params.showConfirm"
        :width="params.width || 300"
        class="float-left"
        @click="handleClick"
        @confirm="handleConfirm"
        @refresh="handleRefresh"
      >
        <template #title>
          {{ params.title || $t('examples.captcha.captchaCardTitle') }}
        </template>
      </PointSelectionCaptcha>

      <ol class="float-left p-5">
        <li v-for="point in selectedPoints" :key="point.i" class="flex">
          <span class="mr-3 w-16">{{
            $t('examples.captcha.index') + point.i
          }}</span>
          <span class="mr-3 w-52">{{
            $t('examples.captcha.timestamp') + point.t
          }}</span>
          <span class="mr-3 w-16">{{
            $t('examples.captcha.x') + point.x
          }}</span>
          <span class="mr-3 w-16">{{
            $t('examples.captcha.y') + point.y
          }}</span>
        </li>
      </ol>
    </Card>
  </Page>
</template>
